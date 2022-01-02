import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { GetStaticProps, NextPage } from "next/types"
import Layout from "components/layouts/DefaultLayout"
import { attributes } from "content/home.md"
import { i18n } from "next-i18next.config"
import FeaturedBlogPosts from "components/home/FeaturedBlogPosts"
import { ILocalizedBlogPost } from "types/Blog"
import { getBlogPostBySlug } from "lib/blog/posts"
import { useRouter } from "next/router"
import AboutComponent from "components/home/AboutComponent"

interface IProps {
  featuredPosts: ILocalizedBlogPost[]
}

const Home: NextPage<IProps> = ({ featuredPosts }) => {
  const { locale } = useRouter()
  return (
    <Layout contact>
      <h1>{attributes[locale ?? i18n.defaultLocale].title}</h1>

      <AboutComponent />

      <FeaturedBlogPosts featuredPosts={featuredPosts} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const featuredPosts = (
    await Promise.all(
      attributes[locale ?? i18n.defaultLocale].featured.map((slug: string) =>
        getBlogPostBySlug(slug, locale)
      )
    )
  ).map((post) => post[locale ?? i18n.defaultLocale])

  return {
    props: {
      ...(await serverSideTranslations(locale ?? i18n.defaultLocale, [
        "common",
        "blog",
        "home",
      ])),
      featuredPosts,
    },
  }
}

export default Home
