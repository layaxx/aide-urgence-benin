import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share"

import styles from "./ShareButtons.module.css"

const ShareButtons: React.FC = () => {
  const router = useRouter()
  const url = router.basePath + router.asPath

  const iconProps = {
    round: true,
    iconFillColor: "var(--primary)",
    bgStyle: {
      fill: "none",
    },
  }
  const { t } = useTranslation()

  return (
    <div className={styles.container}>
      <EmailShareButton url={url} title={t("share-on", { name: "Email" })}>
        <EmailIcon {...iconProps} />
      </EmailShareButton>

      <FacebookShareButton
        url={url}
        title={t("share-on", { name: "Facebook" })}
      >
        <FacebookIcon {...iconProps} />
      </FacebookShareButton>

      <WhatsappShareButton
        url={url}
        title={t("share-on", { name: "Whatsapp" })}
      >
        <WhatsappIcon {...iconProps} />
      </WhatsappShareButton>
    </div>
  )
}

export default ShareButtons
