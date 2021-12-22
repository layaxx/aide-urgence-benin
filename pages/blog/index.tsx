import Link from "next/link"
import Layout from "../../components/DefaultLayout"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { GetStaticProps } from "next"
import config, { i18n } from "../../next-i18next.config"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { IBlogPost } from "../../types/Blog"

const importBlogPosts = async () => {
  // https://webpack.js.org/guides/dependency-management/#requirecontext
  const markdownFiles = require
    .context("../../content/blogPosts", false, /\.md$/)
    .keys()
    .map((relativePath: string) => relativePath.substring(2))

  return Promise.all(
    markdownFiles.map(async (path: string) => {
      const markdown = await import(`../../content/blogPosts/${path}`)
      return { ...markdown, slug: path.substring(0, path.length - 3) }
    })
  )
}

const Blog = ({ postsList }: { postsList: IBlogPost[] }) => {
  const router = useRouter()
  const { t } = useTranslation()
  return (
    <Layout>
      <h1>{t("blog:headline")}</h1>
      {postsList.map((post: IBlogPost) => (
        <div key={post.slug} className="post">
          <Link href="/blog/post/[slug]" as={`/blog/post/${post.slug}`}>
            <a>
              <img
                src={
                  post.attributes[router.locale ?? i18n.defaultLocale]
                    ?.thumbnail
                }
              />
              <h2>
                {post.attributes[router.locale ?? i18n.defaultLocale]?.title}
              </h2>
            </a>
          </Link>
        </div>
      ))}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const postsList = await importBlogPosts()

  return {
    props: {
      ...(await serverSideTranslations(locale ?? config.i18n.defaultLocale, [
        "common",
        "blog",
      ])),
      postsList,
    },
  }
}

export default Blog
