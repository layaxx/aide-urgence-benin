import { INewBlogPost } from "types/Blog"
import fs from "fs"
import path from "path"
import { i18n } from "next-i18next.config"
import { getAuthorBySlug } from "./authors"

const directory = "content/blog/posts" as const

let postCache: INewBlogPost[]

export async function fetchAllBlogPostSlugs() {
  return (await fetchAllBlogPosts()).map(
    (post) => post[i18n.defaultLocale].slug
  )
}

export async function getAllBlogPostPaths() {
  return (await fetchAllBlogPosts()).flatMap((post) =>
    Object.keys(post).map((locale) => ({
      params: { slug: post[i18n.defaultLocale].slug },
      locale,
    }))
  )
}

export async function getBlogPostByAuthor(slug: string) {
  return (await fetchAllBlogPosts()).filter(
    (post) => post[i18n.defaultLocale].author?.name === slug
  )
}

export async function getBlogPostBySlug(
  slug: string,
  locale?: string | undefined
) {
  return (await fetchAllBlogPosts()).find(
    (post) => post[locale ?? i18n.defaultLocale].slug === slug
  )
}

export async function fetchAllBlogPosts() {
  if (postCache && postCache.length) return postCache

  const allData: INewBlogPost[] = await Promise.all(
    await fs.promises
      .readdir(path.join(process.cwd(), directory))
      .then((result) =>
        result.flatMap(async (blogName) => {
          const slug = blogName.substring(0, blogName.length - 3)

          const importedBlogPost = await import(`../../${directory}/${slug}.md`)

          const authorSlug =
            importedBlogPost.attributes[i18n.defaultLocale].author

          const author = (await getAuthorBySlug(authorSlug)) ?? null

          return {
            de: {
              ...importedBlogPost.attributes.de,
              slug,
              author: author?.de ?? null,
            },
            en: {
              ...importedBlogPost.attributes.en,
              slug,
              author: author?.en ?? null,
            },
            fr: {
              ...importedBlogPost.attributes.fr,
              slug,
              author: author?.fr ?? null,
            },
          }
        })
      )
  )

  postCache = allData.sort((a, b) => {
    if (a[i18n.defaultLocale].date < b[i18n.defaultLocale].date) {
      return 1
    } else {
      return -1
    }
  })

  return postCache
}
