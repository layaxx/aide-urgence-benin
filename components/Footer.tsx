import { useTranslation } from "next-i18next"
import Link from "next/link"
import { SocialIcon } from "react-social-icons"
import { UilArrow } from "@iconscout/react-unicons"

import styles from "./Footer.module.css"

export default function Footer() {
  const { t } = useTranslation()

  const socialUrls = [
    "mailto:aideurgencebenin@gmail.com",
    "https://www.instagram.com/aide_urgence_benin/",
    "https://www.facebook.com/Aide-Urgence-Benin-107726741750178/",
  ]

  const commonStyles = {
    height: "1.5rem",
    width: "1.5rem",
    justifySelf: "center",
    marginInline: "0.5rem",
  }

  return (
    <footer className={`container ${styles.footer}`}>
      <div className={styles.info}>
        <small>{t("footer.tagline")}</small>

        <div>
          {socialUrls.map((url) => (
            <SocialIcon
              url={url}
              style={commonStyles}
              key={url}
              target="_blank"
              rel="noreferrer"
            />
          ))}
        </div>

        <small>
          <Link href={"/imprint"}>
            <a>{t("footer.links.imprint")}</a>
          </Link>
        </small>
      </div>

      <div className={styles.credits}>
        <small>
          <UilArrow /> by{" "}
          <a href="https://y-lang.eu" target="_blank" rel="noreferrer">
            Yannick Lang
          </a>
        </small>
      </div>
    </footer>
  )
}
