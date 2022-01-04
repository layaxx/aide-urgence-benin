import { IAuthor } from "types/Blog"
import fs from "fs"
import path from "path"
import { locales } from "lib/config"
import { i18n } from "next-i18next.config"

const directory = "content/blog/authors" as const

let cache: IAuthor[]

export async function fetchAllAuthorSlugs() {
  return (await fetchAllAuthors()).map((author) => author.slug)
}

export async function getAllAuthorPaths() {
  return (await fetchAllAuthors()).flatMap((author) =>
    locales.map((locale) => ({
      params: { slug: author.slug },
      locale,
    }))
  )
}

export async function getAuthorBySlug(slug: string) {
  return (await fetchAllAuthors()).find((post) => post.slug === slug)
}

export async function fetchAllAuthors() {
  if (cache && cache.length) return cache

  cache = await Promise.all(
    await fs.promises
      .readdir(path.join(process.cwd(), directory))
      .then((result) =>
        result.flatMap(async (filename) => {
          const slug = filename.substring(0, filename.length - 3)

          const { attributes } = await import(`../../${directory}/${slug}.md`)
          const { name, portrait, socials } = attributes[i18n.defaultLocale]
          return {
            slug,
            name,
            portrait,
            socials,
            localized: Object.fromEntries(
              locales.map((locale) => [
                locale,
                { description: attributes[locale].description ?? null },
              ])
            ),
          } as IAuthor
        })
      )
  )

  return cache
}
