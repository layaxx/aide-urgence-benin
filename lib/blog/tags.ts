import { ITag } from "types/Blog"
import fs from "fs"
import path from "path"
import { i18n } from "next-i18next.config"

const directory = "content/blog/tags" as const

let cache: ITag[]

export async function fetchAllTagSlugs() {
  return (await fetchAllTags()).map((tag) => tag[i18n.defaultLocale].slug)
}

export async function getAllTagPaths() {
  return (await fetchAllTags()).flatMap((tag) =>
    Object.keys(tag).map((locale) => ({
      params: { slug: tag[i18n.defaultLocale].slug },
      locale,
    }))
  )
}

export async function getTagBySlug(slug: string, locale?: string | undefined) {
  return (await fetchAllTags()).find(
    (tag) => tag[locale ?? i18n.defaultLocale].slug === slug
  )
}

export async function getTagsbySlugs(slugs: string[]) {
  return await Promise.all(slugs.map(async (slug) => await getTagBySlug(slug)))
}

export async function fetchAllTags() {
  if (cache && cache.length) return cache

  const allData: ITag[] = await Promise.all(
    await fs.promises
      .readdir(path.join(process.cwd(), directory))
      .then((result) =>
        result.flatMap(async (filename) => {
          const slug = filename.substring(0, filename.length - 3)

          const importedTag = await import(`../../${directory}/${slug}.md`)
          return {
            de: { ...importedTag.attributes.de, slug },
            en: { ...importedTag.attributes.en, slug },
            fr: { ...importedTag.attributes.fr, slug },
          }
        })
      )
  )

  cache = allData
  return cache
}
