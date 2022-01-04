import { locales } from "lib/config"

export type Locale = typeof locales[number]

export interface ILocalizedBlogPost {
  title: string
  body: string
}

export type INewBlogPost = {
  slug: string
  date: string
  tags: ITag[]
  thumbnail?: string
  availableLocales: Set<Locale> | Locale[]
  author: IAuthor | null
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

export type IAuthor = {
  portrait: string
  socials: SocialLink[]
  slug: string
  name: string
  localized: {
    [key in Locale]: ILocalizedAuthor
  }
}

export interface INavigationData {
  prev: INewBlogPost | null
  next: INewBlogPost | null
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
