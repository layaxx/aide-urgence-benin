import { useTranslation } from "next-i18next"
import Link from "next/link"
import ContrastSelector from "./ContrastSelector"
import LocaleSelector from "./LocaleSelector"

export default function Navbar() {
  const { t } = useTranslation()

  return (
    <>
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
          <ContrastSelector />
        </ul>
      </nav>
    </>
  )
}
