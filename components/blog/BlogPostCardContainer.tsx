import { useTranslation } from "next-i18next"
import { INewBlogPost } from "types/Blog"
import BlogPostCard from "./BlogPostCard"

import styles from "./BlogPostCardContainer.module.css"

interface IProps {
  posts: INewBlogPost[]
}

const BlogPostCardContainer: React.FC<IProps> = ({ posts }) => {
  const { t } = useTranslation()

  return (
    <div className={styles.container}>
      {posts.length
        ? posts.map((post) => {
            return <BlogPostCard key={post.slug} post={post} />
          })
        : t("blog:no-posts")}
    </div>
  )
}

export default BlogPostCardContainer
