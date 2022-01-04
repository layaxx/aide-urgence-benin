import Layout from "components/layouts/DefaultLayout"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { GetStaticProps, NextPage } from "next"
import { i18n } from "next-i18next.config"
import { useTranslation } from "next-i18next"
import { BlogPost } from "types/Blog"
import { fetchAllBlogPosts } from "lib/blog/posts"
import BlogPostCardContainer from "components/blog/BlogPostCardContainer"
import config from "lib/config"
import SEO from "components/SEO"

interface IProps {
  postsList: BlogPost[]
}

const Blog: NextPage<IProps> = ({ postsList }) => {
  const { t } = useTranslation()

  return (
    <>
      <SEO
        url={`${config.baseurl}/blog`}
        openGraphType="website"
        title={t("blog:headline")}
      />

      <Layout>
        <h1>{t("blog:headline")}</h1>
        <BlogPostCardContainer posts={postsList} />
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const postsList = await fetchAllBlogPosts()

  return {
    props: {
      ...(await serverSideTranslations(locale ?? i18n.defaultLocale, [
        "common",
        "blog",
      ])),
      postsList,
    },
  }
}

export default Blog
