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
      fill: "var(--switch-background-color)",
    },
  }
  return (
    <div className={styles.container}>
      <EmailShareButton url={url}>
        <EmailIcon {...iconProps} />
      </EmailShareButton>

      <FacebookShareButton url={url}>
        <FacebookIcon {...iconProps} />
      </FacebookShareButton>

      <WhatsappShareButton url={url}>
        <WhatsappIcon {...iconProps} />
      </WhatsappShareButton>
    </div>
  )
}

export default ShareButtons
