import { IAuthor } from "types/Blog"
import fs from "fs"
import path from "path"
import { i18n } from "next-i18next.config"

const directory = "content/blog/authors" as const

let cache: IAuthor[]

export async function fetchAllAuthorSlugs() {
  return (await fetchAllAuthors()).map(
    (author) => author[i18n.defaultLocale].slug
  )
}

export async function getAllAuthorPaths() {
  return (await fetchAllAuthors()).flatMap((author) =>
    Object.keys(author).map((locale) => ({
      params: { slug: author[i18n.defaultLocale].slug },
      locale,
    }))
  )
}

export async function getAuthorBySlug(
  slug: string,
  locale?: string | undefined
) {
  return (await fetchAllAuthors()).find(
    (post) => post[locale ?? i18n.defaultLocale].slug === slug
  )
}

export async function fetchAllAuthors() {
  if (cache && cache.length) return cache

  const allData: IAuthor[] = await Promise.all(
    await fs.promises
      .readdir(path.join(process.cwd(), directory))
      .then((result) =>
        result.flatMap(async (filename) => {
          const slug = filename.substring(0, filename.length - 3)

          const importedBlogPost = await import(`../../${directory}/${slug}.md`)
          return {
            de: { ...importedBlogPost.attributes.de, slug },
            en: { ...importedBlogPost.attributes.en, slug },
            fr: { ...importedBlogPost.attributes.fr, slug },
          }
        })
      )
  )

  cache = allData
  return cache
}
