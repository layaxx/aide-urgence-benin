import dayjs from "dayjs"
import { getLocale } from "lib/locale"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { BlogPost, Locale } from "types/Blog"
import { useTranslation } from "next-i18next"
import { i18n } from "next-i18next.config"
import * as Unicons from "@iconscout/react-unicons"

import styles from "./BlogPostCard.module.css"

interface IProps {
  post: BlogPost
}

const BlogPostCard: React.FC<IProps> = ({ post }) => {
  const { t } = useTranslation()

  const { locale } = useRouter()

  const availableForLocale = new Set(post.availableLocales).has(
    locale as Locale,
  )

  const title =
    post.localized[getLocale(locale)]?.title ??
    post.localized[i18n.defaultLocale as Locale]?.title

  return (
    <article key={post.slug} className={styles.container}>
      <Link
        href="/blog/post/[slug]"
        as={`/blog/post/${post.slug}`}
        title={title}
      >
        <div className={styles.imagePlaceholder} data-theme="dark">
          {post.thumbnail && (
            <Image
              src={post.thumbnail.replace("/public/", "/")}
              alt={"thumbnail " + title}
              layout="fill"
              objectFit="cover"
            />
          )}
        </div>
      </Link>
      <div>
        <div className={styles.details}>
          <small>
            {dayjs(post.date).toDate().toLocaleDateString(getLocale(locale))}
          </small>
          {post.author && (
            <Link
              href="/blog/author/[slug]"
              as={`/blog/author/${post.author.name}`}
              title={post.author.name}
            >
              {post.author.name}
            </Link>
          )}
        </div>
        <div>
          <Link
            href="/blog/post/[slug]"
            as={`/blog/post/${post.slug}`}
            title={title}
          >
            <em
              data-tooltip={
                !availableForLocale
                  ? t("blog:locale-not-available", { locale })
                  : undefined
              }
            >
              <span>{title}</span>
              {!availableForLocale && (
                <Unicons.UilExclamationTriangle size="30" color="#ffc107" />
              )}
            </em>
          </Link>
        </div>
      </div>
    </article>
  )
}

export default BlogPostCard
