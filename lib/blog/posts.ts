import { INewBlogPost, ITag } from "types/Blog"
import fs from "fs"
import path from "path"
import { i18n } from "next-i18next.config"
import { getAuthorBySlug } from "./authors"
import { getTagsbySlugs } from "./tags"

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

export async function getBlogPostsByTag(slug: string) {
  return (await fetchAllBlogPosts()).filter(
    (post) =>
      post[i18n.defaultLocale].tags.filter((tag) => tag.slug === slug).length
  )
}

export async function getBlogPostsByAuthor(slug: string) {
  return (await fetchAllBlogPosts()).filter(
    (post) => post[i18n.defaultLocale].author?.name === slug
  )
}

export async function getNavigationDataForBlog(
  slug: string,
  locale: string | undefined
) {
  const allPosts = await fetchAllBlogPosts()
  const postIndex = allPosts.findIndex(
    (post) => post[i18n.defaultLocale].slug === slug
  )

  if (postIndex === -1) {
    throw new Error("Failed to load Navigation Data for " + slug)
  }

  const prev = allPosts[postIndex + 1]
  const next = allPosts[postIndex - 1]
  return {
    prev: prev ? prev[locale ?? i18n.defaultLocale] : null,
    next: next ? next[locale ?? i18n.defaultLocale] : null,
  }
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

          const tagsSlugs =
            importedBlogPost.attributes[i18n.defaultLocale].tags ?? []
          const tags = ((await getTagsbySlugs(tagsSlugs)) ?? []).filter(
            (tag) => tag !== undefined
          ) as ITag[]

          return {
            de: {
              ...importedBlogPost.attributes.de,
              slug,
              author: author?.de ?? null,
              tags: tags.map((tag) => tag.de),
            },
            en: {
              ...importedBlogPost.attributes.en,
              slug,
              author: author?.en ?? null,
              tags: tags.map((tag) => tag.en),
            },
            fr: {
              ...importedBlogPost.attributes.fr,
              slug,
              author: author?.fr ?? null,
              tags: tags.map((tag) => tag.fr),
            },
          }
        })
      )
  )

  allData.sort((a, b) => {
    if (a[i18n.defaultLocale].date < b[i18n.defaultLocale].date) {
      return 1
    } else {
      return -1
    }
  })
  postCache = allData

  return postCache
}
