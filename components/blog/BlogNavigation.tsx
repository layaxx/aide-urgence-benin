import { useTranslation } from "next-i18next"
import Link from "next/link"
import { FC } from "react"
import { INavigationData } from "types/Blog"

import styles from "./BlogNavigation.module.css"

interface IProps {
  data: INavigationData
}

const BlogNavigation: FC<IProps> = ({ data }) => {
  const { t } = useTranslation()

  return (
    <nav className={styles.navigation}>
      {data.next ? (
        <Link href="/blog/post/[slug]" as={"/blog/post/" + data.next?.slug}>
          <a title={data.next.title}>
            {t("blog:nav.next")}: {data.next.title}
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
          <a title={data.prev.title}>
            {t("blog:nav.prev")}: {data.prev.title}
          </a>
        </Link>
      ) : (
        <span></span>
      )}
    </nav>
  )
}

export default BlogNavigation
