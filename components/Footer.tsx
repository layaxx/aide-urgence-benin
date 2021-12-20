import { useTranslation } from "next-i18next"

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="container flex-between">
      <small>{t("footer.tagline")}</small>
      <small>
        <a>{t("footer.links.imprint")}</a>
      </small>
    </footer>
  )
}
