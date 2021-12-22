import Link from "next/link"
import Layout from "components/layouts/DefaultLayout"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { GetStaticProps, NextPage } from "next"
import config, { i18n } from "next-i18next.config"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { IBlogPost, INewBlogPost } from "types/Blog"
import { fetchAllBlogPosts } from "lib/blog/posts"

interface IProps {
  postsList: INewBlogPost[]
}

const Blog: NextPage<IProps> = ({ postsList }) => {
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <Layout>
      <h1>{t("blog:headline")}</h1>
      {postsList.map((post: INewBlogPost) => (
        <div key={post[i18n.defaultLocale].slug} className="post">
          <Link
            href="/blog/post/[slug]"
            as={`/blog/post/${post[i18n.defaultLocale].slug}`}
          >
            <a>
              <img src={post[i18n.defaultLocale].thumbnail} />
              <h2>{post[router.locale ?? i18n.defaultLocale].title}</h2>
            </a>
          </Link>
        </div>
      ))}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const postsList = await fetchAllBlogPosts()

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
