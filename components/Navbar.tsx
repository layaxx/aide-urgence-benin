import { useTranslation } from "next-i18next"
import Link from "next/link"
import ContrastSelector from "./ContrastSelector"
import LocaleSelector from "./LocaleSelector"

import styles from "./Navbar.module.css"

export default function Navbar() {
  const { t } = useTranslation()

  return (
    <>
      <nav className={"container " + styles.navbarSettings}>
        <ul>
          <li>
            <LocaleSelector />
          </li>
          <ContrastSelector />
        </ul>
      </nav>
      <nav className={"container " + styles.navbarLinks}>
        <ul>
          <li>
            <Link href="/" className={`contrast ${styles.brand}`}>
              <strong>
                <span style={{ color: "var(--primary-green)" }}>Aide</span>{" "}
                <span style={{ color: "var(--primary-yellow)" }}>Urgence</span>{" "}
                <span style={{ color: "var(--primary-red)" }}>Bénin</span>
              </strong>
            </Link>
          </li>
        </ul>

        <ul>
          <li>
            <Link href="/blog">
              <strong>{t("menu.links.blog")}</strong>
            </Link>
          </li>

          <li>
            <Link href="/gallery">
              <strong>{t("menu.links.gallery")}</strong>
            </Link>
          </li>

          <li>
            <Link href="/projects">
              <strong>{t("menu.links.projects")}</strong>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
