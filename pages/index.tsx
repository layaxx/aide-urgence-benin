import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { GetStaticProps, NextPage } from "next/types"
import Layout from "components/layouts/DefaultLayout"
import { attributes } from "content/home.md"
import FeaturedBlogPosts from "components/home/FeaturedBlogPosts"
import { BlogPost } from "types/Blog"
import { getBlogPostBySlug } from "lib/blog/posts"
import AboutComponent from "components/home/AboutComponent"
import SEO from "components/SEO"
import config from "lib/config.json"
import { getLocale } from "lib/locale"

interface IProps {
  featuredPosts: BlogPost[]
}

const Home: NextPage<IProps> = ({ featuredPosts }) => {
  return (
    <>
      <SEO url={`${config.baseurl}`} />

      <Layout contact>
        <AboutComponent />

        <FeaturedBlogPosts featuredPosts={featuredPosts} />
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const featuredPosts = await Promise.all(
    (attributes[getLocale(locale)].featured ?? []).map((slug: string) =>
      getBlogPostBySlug(slug),
    ),
  )

  return {
    props: {
      ...(await serverSideTranslations(getLocale(locale), [
        "common",
        "blog",
        "home",
      ])),
      featuredPosts,
    },
  }
}

export default Home
