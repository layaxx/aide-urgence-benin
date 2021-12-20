import { useTranslation } from "next-i18next"
import Link from "next/link"
import Script from "next/script"
import LocaleSelector from "./LocaleSelector"

export default function Navbar() {
  const { t } = useTranslation()

  return (
    <>
      <Script type="text/javascript" src="/js/themeSwitcher.js" />
      <nav className="container-fluid">
        <ul>
          <li>
            <Link href="/">
              <a className="contrast">
                <strong>{t("config.name")}</strong>
              </a>
            </Link>
          </li>
        </ul>

        <ul>
          <li>
            <LocaleSelector />
          </li>
          <li>
            <a
              href="#"
              className="contrast"
              data-theme-switcher="auto"
              onClick={(event) => event.preventDefault()}
            >
              {t("menu.theme.auto")}
            </a>
          </li>
          <li>
            <a
              href="#"
              className="contrast"
              data-theme-switcher="light"
              onClick={(event) => event.preventDefault()}
            >
              {t("menu.theme.light")}
            </a>
          </li>
          <li>
            <a
              href="#"
              className="contrast"
              data-theme-switcher="dark"
              onClick={(event) => event.preventDefault()}
            >
              {t("menu.theme.dark")}
            </a>
          </li>
        </ul>
      </nav>
    </>
  )
}
