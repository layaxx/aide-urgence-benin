import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NextParsedUrlQuery } from "next/dist/server/request-meta"
import { useRouter } from "next/router"
import Layout from "components/layouts/DefaultLayout"
import { i18n } from "next-i18next.config"
import { INewBlogPost } from "types/Blog"
import { getAllBlogPostPaths, getBlogPostBySlug } from "lib/blog/posts"

interface IParams extends NextParsedUrlQuery {
  slug: string
}

interface IProps {
  post: INewBlogPost | undefined
}

const Post = ({ post }: IProps) => {
  if (!post) return <div>not found</div>

  const router = useRouter()

  const localizedAttributes = post[router.locale ?? i18n.defaultLocale]

  return (
    <Layout>
      <article>
        <h1>{localizedAttributes.title}</h1>
        <img src={localizedAttributes.thumbnail} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = await getAllBlogPostPaths()
  return {
    paths,
    fallback: false, // controls whether not predefined paths should be processed on demand, check for more info: https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required
  }
}

export const getStaticProps: GetStaticProps<IProps, IParams> = async ({
  params,
  locale,
}) => {
  const post = await getBlogPostBySlug(params?.slug ?? "", locale)

  return {
    props: {
      ...(await serverSideTranslations(locale ?? i18n.defaultLocale, [
        "common",
        "blog",
      ])),
      post: post,
    },
  }
}

export default Post
