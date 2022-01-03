import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
} from "react-share"
import { SocialIcon } from "react-social-icons"
import config from "lib/config.json"

import styles from "./ShareButtons.module.css"

const ShareButtons: React.FC = () => {
  const router = useRouter()
  const url = config.baseurl + router.asPath
  const { t } = useTranslation()

  return (
    <div className={styles.container}>
      <EmailShareButton url={url}>
        <SocialIcon network="email" title={t("share-on", { name: "Email" })} />
      </EmailShareButton>

      <FacebookShareButton url={url}>
        <SocialIcon
          network="facebook"
          title={t("share-on", { name: "Facebook" })}
        />
      </FacebookShareButton>

      <WhatsappShareButton url={url}>
        <SocialIcon
          network="whatsapp"
          title={t("share-on", { name: "Whatsapp" })}
        />
      </WhatsappShareButton>
    </div>
  )
}

export default ShareButtons
