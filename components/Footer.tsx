import { useTranslation } from "next-i18next"
import Link from "next/link"
import { SocialIcon } from "react-social-icons"

export default function Footer() {
  const { t } = useTranslation()

  const url = "https://www.instagram.com/aide_urgence_benin/"

  return (
    <footer className="container flex-between">
      <small>{t("footer.tagline")}</small>

      <SocialIcon url={url} />

      <small>
        <Link href={"/imprint"}>
          <a>{t("footer.links.imprint")}</a>
        </Link>
      </small>
    </footer>
  )
}
