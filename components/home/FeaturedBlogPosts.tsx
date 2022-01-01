import BlogPostCardContainer from "components/blog/BlogPostCardContainer"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import { ILocalizedBlogPost } from "types/Blog"

interface IProps {
  featuredPosts: ILocalizedBlogPost[]
}

const FeaturedBlogPosts: React.FC<IProps> = ({ featuredPosts }) => {
  const { t } = useTranslation()
  return (
    <>
      <h2 style={{ marginBottom: 0 }}>
        {t("home:headings.featured-blog-posts")}
      </h2>
      <BlogPostCardContainer posts={featuredPosts} />
      <Link href="/blog">
        <a>{t("blog:nav.all")}</a>
      </Link>
    </>
  )
}

export default FeaturedBlogPosts
