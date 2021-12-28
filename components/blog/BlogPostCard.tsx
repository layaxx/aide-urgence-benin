import dayjs from "dayjs"
import { i18n } from "next-i18next.config"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { ILocalizedBlogPost } from "types/Blog"

import styles from "./BlogPostCard.module.css"

interface IProps {
  localizedPost: ILocalizedBlogPost
}

const BlogPostCard: React.FC<IProps> = ({ localizedPost }) => {
  const router = useRouter()

  return (
    <article key={localizedPost.slug} className={styles.container}>
      <Link href="/blog/post/[slug]" as={`/blog/post/${localizedPost.slug}`}>
        <a>
          {localizedPost.thumbnail ? (
            <Image
              src={localizedPost.thumbnail}
              alt={"thumbnail " + localizedPost.title}
            />
          ) : (
            <div className={styles.imagePlaceholder} data-theme="dark" />
          )}
        </a>
      </Link>
      <div>
        <div className={styles.details}>
          <small>
            {dayjs(localizedPost.date)
              .toDate()
              .toLocaleDateString(router.locale ?? i18n.defaultLocale)}
          </small>
          {localizedPost.author && (
            <Link
              href="/blog/author/[slug]"
              as={`/blog/author/${localizedPost.author?.name}`}
            >
              <a>{localizedPost.author?.name}</a>
            </Link>
          )}
        </div>
        <Link href="/blog/post/[slug]" as={`/blog/post/${localizedPost.slug}`}>
          <a>
            <h2>{localizedPost.title}</h2>
          </a>
        </Link>
      </div>
    </article>
  )
}

export default BlogPostCard
