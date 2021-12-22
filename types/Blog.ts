import { i18n } from "../next-i18next.config"
export interface IBlogPost {
  slug: string
  html: string
  attributes: {
    [key: typeof i18n.defaultLocale]: { title: string; thumbnail: string }
  }
}
