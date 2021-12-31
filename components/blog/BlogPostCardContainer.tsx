import { useTranslation } from "next-i18next"
import { ILocalizedBlogPost } from "types/Blog"
import BlogPostCard from "./BlogPostCard"

import styles from "./BlogPostCardContainer.module.css"

interface IProps {
  posts: ILocalizedBlogPost[]
}

const BlogPostCardContainer: React.FC<IProps> = ({ posts }) => {
  const { t } = useTranslation()

  return (
    <div className={styles.container}>
      {posts.length
        ? posts.map((post) => {
            return <BlogPostCard key={post.slug} localizedPost={post} />
          })
        : t("blog:no-posts")}
    </div>
  )
}

export default BlogPostCardContainer
