import {
  INavigationData,
  BlogPost,
  ITag,
  Locale,
  ILocalizedBlogPost,
} from "types/Blog"
import fs from "fs"
import path from "path"
import { i18n } from "next-i18next.config"
import { getAuthorBySlug } from "./authors"
import { getTagsbySlugs } from "./tags"
import { locales } from "lib/config"

const directory = "content/blog/posts" as const

let postCache: BlogPost[]

export async function fetchAllBlogPostSlugs() {
  return (await fetchAllBlogPosts()).map((post) => post.slug)
}

export async function getAllBlogPostPaths() {
  return (await fetchAllBlogPosts()).flatMap((post) =>
    locales.map((locale) => ({
      params: { slug: post.slug },
      locale,
    })),
  )
}

export async function getBlogPostsByTag(slug: string) {
  return (await fetchAllBlogPosts()).filter(
    (post) => post.tags.filter((tag) => tag.slug === slug).length,
  )
}

export async function getBlogPostsByAuthor(slug: string) {
  return (await fetchAllBlogPosts()).filter(
    (post) => post.author?.slug === slug,
  )
}

export async function getNavigationDataForBlog(
  slug: string,
): Promise<INavigationData> {
  const allPosts = await fetchAllBlogPosts()
  const postIndex = allPosts.findIndex((post) => post.slug === slug)

  if (postIndex === -1) {
    throw new Error("Failed to load Navigation Data for " + slug)
  }

  const prev = allPosts[postIndex + 1]
  const next = allPosts[postIndex - 1]
  return {
    prev: prev ?? null,
    next: next ?? null,
  }
}

export async function getBlogPostBySlug(slug: string) {
  return (await fetchAllBlogPosts()).find((post) => post.slug === slug)
}

export async function fetchAllBlogPosts() {
  if (postCache && postCache.length) return postCache

  const allData: BlogPost[] = await Promise.all(
    await fs.promises
      .readdir(path.join(process.cwd(), directory))
      .then((result) =>
        result.flatMap(async (blogName) => {
          const slug = blogName.substring(0, blogName.length - 3)

          const { attributes } = await import(`../../${directory}/${slug}.md`)

          const defLocaleAttributes = attributes[i18n.defaultLocale]

          const authorSlug = defLocaleAttributes.author
          const author = (await getAuthorBySlug(authorSlug)) ?? null

          const tagsSlugs = defLocaleAttributes.tags ?? []
          const tags = ((await getTagsbySlugs(tagsSlugs)) ?? []).filter(
            (tag) => tag !== undefined,
          ) as ITag[]

          const availableLocales = new Set(
            locales.filter(
              (locale) => attributes[locale].title && attributes[locale].body,
            ),
          )

          const localized: Record<Locale, ILocalizedBlogPost | null> = {
            de: null,
            fr: null,
          }
          locales.forEach(
            (locale) =>
              (localized[locale] = availableLocales.has(locale)
                ? {
                    title: attributes[locale].title,
                    body: attributes[locale].body,
                  }
                : null),
          )

          return {
            slug,
            author,
            date: defLocaleAttributes.date,
            tags,
            availableLocales: Array.from(availableLocales.values()),
            thumbnail: defLocaleAttributes.thumbnail ?? null,
            localized,
          }
        }),
      ),
  )

  allData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
  postCache = allData

  return postCache
}
