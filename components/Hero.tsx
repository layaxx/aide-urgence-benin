import config from "lib/config"
import { useTranslation } from "next-i18next"
import Navbar from "./Navbar"

export default function Hero() {
  const { t } = useTranslation()

  return (
    <div
      className="hero"
      data-theme="dark"
      style={{
        marginBottom: "1rem",
        backgroundImage: `url(${
          config.hero
            ? config.hero.replace("/public/", "/")
            : "/static/hero.jpg"
        })`,
      }}
    >
      <Navbar />

      <header className="container">
        <hgroup>
          <h1>{config.title}</h1>
          <h2>{t("hero.tagline")}</h2>
        </hgroup>
        {config.campaign && (
          <p>
            <a href={config.campaign}>{t("hero.cta")}</a>
          </p>
        )}
      </header>
    </div>
  )
}
