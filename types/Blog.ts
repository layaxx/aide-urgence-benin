import { i18n } from "../next-i18next.config"
export interface IBlogPost {
  slug: string
  html: string
  attributes: {
    [key: typeof i18n.defaultLocale]: { title: string; thumbnail: string }
  }
}
interface IAuthor {
  /* TODO: */
}

interface ILocalizedBlogPost {
  title: string
  thumbnail: string
  content: string
  author?: IAuthor
  tags: [string]
  slug: string
  date: string
}

export interface INewBlogPost {
  [key: typeof i18n.defaultLocale]: ILocalizedBlogPost
}
