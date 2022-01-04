import { ITag } from "types/Blog"
import fs from "fs"
import path from "path"
import { locales } from "lib/config"

const directory = "content/blog/tags" as const

let cache: ITag[]

export async function fetchAllTagSlugs() {
  return (await fetchAllTags()).map((tag) => tag.slug)
}

export async function getAllTagPaths() {
  return (await fetchAllTags()).flatMap((tag) =>
    locales.map((locale) => ({
      params: { slug: tag.slug },
      locale,
    }))
  )
}

export async function getTagBySlug(slug: string) {
  return (await fetchAllTags()).find((tag) => tag.slug === slug)
}

export async function getTagsbySlugs(slugs: string[]) {
  return Promise.all(slugs.map((slug) => getTagBySlug(slug)))
}

export async function fetchAllTags() {
  if (cache && cache.length) return cache

  cache = await Promise.all(
    await fs.promises
      .readdir(path.join(process.cwd(), directory))
      .then((result) =>
        result.flatMap(async (filename) => {
          const slug = filename.substring(0, filename.length - 3)

          const { attributes } = await import(`../../${directory}/${slug}.md`)
          return {
            slug,
            localized: Object.fromEntries(
              locales.map((locale) => [
                locale,
                { title: attributes[locale].title ?? "" },
              ])
            ),
          } as ITag
        })
      )
  )

  return cache
}
