import { i18n } from "../next-i18next.config"
export interface IBlogPost {
  slug: string
  html: string
  attributes: {
    [key: typeof i18n.defaultLocale]: { title: string; thumbnail: string }
  }
}

export interface ILocalizedBlogPost {
  title: string
  thumbnail?: string
  body: string
  author?: ILocalizedAuthor
  tags: string[]
  slug: string
  date: string
}

export interface INewBlogPost {
  [key: typeof i18n.defaultLocale]: ILocalizedBlogPost
}

interface SocialLink {
  url: string
  name: string
}

export interface ILocalizedAuthor {
  name: string
  portrait: string
  description: string
  socials: SocialLink[]
  slug: string
}

export interface IAuthor {
  [key: typeof i18n.defaultLocale]: ILocalizedAuthor
}
