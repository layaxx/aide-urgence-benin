import fs from "fs"
import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NextParsedUrlQuery } from "next/dist/server/request-meta"
import { useRouter } from "next/router"
import path from "path"
import Layout from "components/DefaultLayout"
import { i18n } from "next-i18next.config"
import { IBlogPost } from "types/Blog"

interface IParams extends NextParsedUrlQuery {
  slug: string
}

interface IProps {
  blogpost: IBlogPost
}

const Post = ({ blogpost }: IProps) => {
  if (!blogpost) return <div>not found</div>

  const { html, attributes } = blogpost

  const router = useRouter()

  const localizedAttributes = attributes[router.locale ?? i18n.defaultLocale]

  return (
    <Layout>
      <article>
        <h1>{localizedAttributes.title}</h1>
        <img src={localizedAttributes.thumbnail} />
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const [paths] = await Promise.all(
    fs
      .readdirSync(path.join(process.cwd(), "content/blogPosts"))
      .flatMap(async (blogName) => {
        console.log(blogName)
        const slug = blogName.substring(0, blogName.length - 3)

        const post: IBlogPost = await import(
          `../../../content/blogPosts/${slug}.md`
        ).catch(() => null)

        if (!post) {
          throw new Error("Failed to fetch Blog Post: " + blogName)
        }

        return Object.keys(post.attributes).map((locale) => ({
          params: { slug },
          locale,
        }))
      })
  )

  return {
    paths,
    fallback: false, // controls whether not predefined paths should be processed on demand, check for more info: https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required
  }
}

export const getStaticProps: GetStaticProps<IProps, IParams> = async ({
  params,
  locale,
}) => {
  const { slug } = params ?? {}

  const post = await import(`../../../content/blogPosts/${slug}.md`).catch(
    () => null
  )

  return {
    props: {
      ...(await serverSideTranslations(locale ?? i18n.defaultLocale, [
        "common",
        "blog",
      ])),
      blogpost: post.default,
    },
  }
}

export default Post
