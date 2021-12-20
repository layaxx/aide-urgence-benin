import Link from "next/link"
import Layout from "../../components/DefaultLayout"
import { IPost } from "./post/[slug]"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { GetStaticProps } from "next"
import config from "../../next-i18next.config"

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

const Blog = ({ postsList }: { postsList: IPost[] }) => (
  <Layout>
    {postsList.map((post: IPost) => (
      <div key={post.slug} className="post">
        <Link href="/blog/post/[slug]" as={`/blog/post/${post.slug}`}>
          <a>
            <img src={post.attributes.thumbnail} />
            <h2>{post.attributes.title}</h2>
          </a>
        </Link>
      </div>
    ))}
    <style jsx>{`
      .post {
        text-align: center;
      }
      img {
        max-width: 100%;
        max-height: 300px;
      }
    `}</style>
  </Layout>
)

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
