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
            <Link href="/">
              <a className={`contrast ${styles.brand}`}>
                <strong>
                  <span style={{ color: "var(--primary-green)" }}>Aide</span>{" "}
                  <span style={{ color: "var(--primary-yellow)" }}>
                    Urgence
                  </span>{" "}
                  <span style={{ color: "var(--primary-red)" }}>Bénin</span>
                </strong>
              </a>
            </Link>
          </li>
        </ul>

        <ul>
          <li>
            <Link href="/blog">
              <a>
                <strong>{t("menu.links.blog")}</strong>
              </a>
            </Link>
          </li>

          <li>
            <Link href="/gallery">
              <a>
                <strong>{t("menu.links.gallery")}</strong>
              </a>
            </Link>
          </li>

          <li>
            <Link href="/projects">
              <a>
                <strong>{t("menu.links.projects")}</strong>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
