import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NextParsedUrlQuery } from "next/dist/server/request-meta"
import { useRouter } from "next/router"
import Layout from "components/layouts/BlogLayout"
import { i18n } from "next-i18next.config"
import { INewBlogPost, ITag } from "types/Blog"
import { useTranslation } from "next-i18next"
import { getBlogPostsByTag } from "lib/blog/posts"
import { getAllTagPaths, getTagBySlug } from "lib/blog/tags"
import BlogPostCardContainer from "components/blog/BlogPostCardContainer"
import config from "lib/config"
import SEO from "components/SEO"

interface IParams extends NextParsedUrlQuery {
  slug: string
}

interface IProps {
  tag: ITag | undefined
  posts: INewBlogPost[]
}

const AuthorPage = ({ tag, posts }: IProps) => {
  const router = useRouter()
  const { t } = useTranslation()

  if (!tag) return <div>not found</div>

  const localizedAttributes = tag[router.locale ?? i18n.defaultLocale]

  return (
    <>
      <SEO
        url={`${config.baseurl}/blog/tag/${localizedAttributes.slug}`}
        openGraphType="website"
        title={localizedAttributes.title}
      />

      <Layout>
        <h1>{localizedAttributes.title}</h1>
        <h2>{t("blog:heading.posts-for-tag")}</h2>
        <BlogPostCardContainer
          posts={posts.map((post) => post[router.locale ?? i18n.defaultLocale])}
        />
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  const paths = await getAllTagPaths()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<IProps, IParams> = async ({
  params,
  locale,
}) => {
  const tag = await getTagBySlug(params?.slug ?? "", locale)
  const posts = await getBlogPostsByTag(params?.slug ?? "")

  return {
    props: {
      ...(await serverSideTranslations(locale ?? i18n.defaultLocale, [
        "common",
        "blog",
      ])),
      tag,
      posts,
    },
  }
}

export default AuthorPage
