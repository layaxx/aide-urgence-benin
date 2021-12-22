import { useTranslation } from "next-i18next"
import Link from "next/link"
import Navbar from "./Navbar"

export default function Hero() {
  const { t } = useTranslation()

  return (
    <div className="hero" data-theme="dark">
      <Navbar />

      <header className="container">
        <hgroup>
          <h1>{t("config.name")}</h1>
          <h2>{t("hero.tagline")}</h2>
        </hgroup>
        <p>
          <Link href="#">
            <a
              role="button"
              onClick={/* TODO: */ () => alert("TODO: Kommt noch")}
            >
              {t("hero.cta")}
            </a>
          </Link>
        </p>
      </header>
    </div>
  )
}
