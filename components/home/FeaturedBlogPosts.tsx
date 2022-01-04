import BlogPostCardContainer from "components/blog/BlogPostCardContainer"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import { BlogPost } from "types/Blog"

interface IProps {
  featuredPosts: BlogPost[]
}

const FeaturedBlogPosts: React.FC<IProps> = ({ featuredPosts }) => {
  const { t } = useTranslation()
  return (
    <>
      <h2 style={{ marginBottom: 0 }}>
        {t("home:headings.featured-blog-posts")}
      </h2>
      <BlogPostCardContainer posts={featuredPosts} />
      <div style={{ textAlign: "center" }}>
        <Link href="/blog">
          <a>{t("blog:nav.all")}</a>
        </Link>
      </div>
    </>
  )
}

export default FeaturedBlogPosts
