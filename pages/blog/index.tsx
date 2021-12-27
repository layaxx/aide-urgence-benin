import Link from "next/link"
import Layout from "components/layouts/DefaultLayout"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { GetStaticProps, NextPage } from "next"
import config, { i18n } from "next-i18next.config"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { INewBlogPost } from "types/Blog"
import { fetchAllBlogPosts } from "lib/blog/posts"
import BlogPostCard from "components/blog/BlogPostCard"

import styles from "./index.module.css"

interface IProps {
  postsList: INewBlogPost[]
}

const Blog: NextPage<IProps> = ({ postsList }) => {
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <Layout>
      <h1>{t("blog:headline")}</h1>
      <div className={styles.container}>
        {postsList.map((post: INewBlogPost) => {
          const localizedPost = post[router.locale ?? i18n.defaultLocale]
          return (
            <BlogPostCard
              key={localizedPost.slug}
              localizedPost={localizedPost}
            />
          )
        })}
      </div>
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
