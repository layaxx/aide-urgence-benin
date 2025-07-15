import { getLocale } from "lib/locale"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import { useRouter } from "next/router"
import { FC } from "react"
import { INavigationData } from "types/Blog"

import styles from "./BlogNavigation.module.css"

interface IProps {
  data: INavigationData
}

const BlogNavigation: FC<IProps> = ({ data }) => {
  const { t } = useTranslation()

  const router = useRouter()

  const locale = getLocale(router.locale)

  return (
    <nav className={styles.navigation}>
      {data.next ? (
        <Link href="/blog/post/[slug]" as={"/blog/post/" + data.next?.slug}>
          <a title={data.next.localized[locale]?.title}>
            {t("blog:nav.next")}: {data.next.localized[locale]?.title}
          </a>
        </Link>
      ) : (
        <span></span>
      )}

      <Link href="/blog">
        <a>{t("blog:nav.all")}</a>
      </Link>

      {data.prev ? (
        <Link href="/blog/post/[slug]" as={"/blog/post/" + data.prev?.slug}>
          <a title={data.prev.localized[locale]?.title}>
            {t("blog:nav.prev")}: {data.prev.localized[locale]?.title}
          </a>
        </Link>
      ) : (
        <span></span>
      )}
    </nav>
  )
}

export default BlogNavigation
