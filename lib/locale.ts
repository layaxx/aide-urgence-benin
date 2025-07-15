import { i18n } from "next-i18next.config"
import { Locale } from "types/Blog"
import { locales } from "./config"

export function getLocale(localeFromRouter: string | undefined): Locale {
  if (localeFromRouter && locales.indexOf(localeFromRouter as Locale) !== -1) {
    return localeFromRouter as Locale
  }
  return i18n.defaultLocale as Locale
}
