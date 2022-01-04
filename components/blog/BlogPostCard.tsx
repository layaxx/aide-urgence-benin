import dayjs from "dayjs"
import { getLocale } from "lib/locale"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { INewBlogPost } from "types/Blog"

import styles from "./BlogPostCard.module.css"

interface IProps {
  post: INewBlogPost
}

const BlogPostCard: React.FC<IProps> = ({ post }) => {
  const { locale } = useRouter()

  const title = post.localized[getLocale(locale)]?.title

  return (
    <article key={post.slug} className={styles.container}>
      <Link href="/blog/post/[slug]" as={`/blog/post/${post.slug}`}>
        <a>
          <div className={styles.imagePlaceholder} data-theme="dark">
            {post.thumbnail && (
              <Image
                src={post.thumbnail}
                alt={"thumbnail " + title}
                /* width={640}
                height={960} */
                layout="fill"
                objectFit="cover"
              />
            )}
          </div>
        </a>
      </Link>
      <div>
        <div className={styles.details}>
          <small>
            {dayjs(post.date).toDate().toLocaleDateString(getLocale(locale))}
          </small>
          {post.author && (
            <Link
              href="/blog/author/[slug]"
              as={`/blog/author/${post.author?.name}`}
            >
              <a>{post.author?.name}</a>
            </Link>
          )}
        </div>
        <Link href="/blog/post/[slug]" as={`/blog/post/${post.slug}`}>
          <a>
            <h2>{title}</h2>
          </a>
        </Link>
      </div>
    </article>
  )
}

export default BlogPostCard
