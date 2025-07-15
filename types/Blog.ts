import { locales } from "lib/config"

export type Locale = (typeof locales)[number]

export interface ILocalizedBlogPost {
  title: string
  body: string
}

export type BlogPost = {
  slug: string
  date: string
  tags: ITag[]
  thumbnail?: string
  availableLocales: Set<Locale> | Locale[]
  author: Author | null
  localized: {
    [key in Locale]: ILocalizedBlogPost | null
  }
}

interface SocialLink {
  url: string
  name: string
}

export interface ILocalizedAuthor {
  description: string
}

export type Author = {
  portrait: string
  socials: SocialLink[]
  slug: string
  name: string
  localized: {
    [key in Locale]: ILocalizedAuthor
  }
}

export interface INavigationData {
  prev: BlogPost | null
  next: BlogPost | null
}

export type ITag = {
  slug: string
  localized: {
    [key in Locale]: ILocalizedTag
  }
}

export interface ILocalizedTag {
  title: string
}
