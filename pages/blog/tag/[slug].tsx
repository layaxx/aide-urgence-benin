import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NextParsedUrlQuery } from "next/dist/server/request-meta"
import { useRouter } from "next/router"
import Layout from "components/layouts/BlogLayout"
import { BlogPost, ITag } from "types/Blog"
import { useTranslation } from "next-i18next"
import { getBlogPostsByTag } from "lib/blog/posts"
import { getAllTagPaths, getTagBySlug } from "lib/blog/tags"
import BlogPostCardContainer from "components/blog/BlogPostCardContainer"
import config from "lib/config"
import SEO from "components/SEO"
import { getLocale } from "lib/locale"

interface IParams extends NextParsedUrlQuery {
  slug: string
}

interface IProps {
  tag: ITag | undefined
  posts: BlogPost[]
}

const AuthorPage = ({ tag, posts }: IProps) => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  if (!tag) return <div>not found</div>

  const localizedAttributes = tag.localized[getLocale(locale)]

  return (
    <>
      <SEO
        url={`${config.baseurl}/blog/tag/${tag.slug}`}
        openGraphType="website"
        title={localizedAttributes.title}
      />

      <Layout>
        <h1>{localizedAttributes.title}</h1>
        <h2>{t("blog:heading.posts-for-tag")}</h2>
        <BlogPostCardContainer posts={posts} />
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
  const tag = await getTagBySlug(params?.slug ?? "")
  const posts = await getBlogPostsByTag(params?.slug ?? "")

  return {
    props: {
      ...(await serverSideTranslations(getLocale(locale), ["common", "blog"])),
      tag,
      posts,
    },
  }
}

export default AuthorPage
