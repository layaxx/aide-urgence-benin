import { useTranslation } from "next-i18next"

import styles from "./AboutComponent.module.css"

const AboutComponent: React.FC = () => {
  const { t } = useTranslation()
  return (
    <>
      <h2 className={styles.heading}>{t("home:headings.about")}</h2>
      <div className={styles.container}>
        <div>
          <h3>{t("home:about.who.heading")}</h3>
          <p>{t("home:about.who.text")}</p>
        </div>

        <div>
          <h3>{t("home:about.what.heading")}</h3>
          <p>{t("home:about.what.text")}</p>
        </div>

        <div>
          <h3>{t("home:about.where.heading")}</h3>
          <p>{t("home:about.where.text")}</p>
        </div>
      </div>
    </>
  )
}

export default AboutComponent
