import { useTranslation } from "next-i18next"
import Link from "next/link"
import { SocialIcon } from "react-social-icons"
import { UilArrow } from "@iconscout/react-unicons"

import styles from "./Footer.module.css"

export default function Footer() {
  const { t } = useTranslation()

  const url = "https://www.instagram.com/aide_urgence_benin/"

  return (
    <footer className={`container ${styles.footer}`}>
      <div className={styles.info}>
        <small>{t("footer.tagline")}</small>

        <SocialIcon
          url={url}
          style={{ height: "1.5rem", width: "1.5rem", justifySelf: "center" }}
        />

        <small>
          <Link href={"/imprint"}>
            <a>{t("footer.links.imprint")}</a>
          </Link>
        </small>
      </div>

      <div className={styles.credits}>
        <small>
          <UilArrow /> by <a href="https://y-lang.eu">Yannick Lang</a>
        </small>
      </div>
    </footer>
  )
}
