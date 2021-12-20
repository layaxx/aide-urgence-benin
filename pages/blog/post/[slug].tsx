import fs from "fs"
import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NextParsedUrlQuery } from "next/dist/server/request-meta"
import path from "path"
import Layout from "../../../components/DefaultLayout"
import { i18n } from "../../../next-i18next.config"

export interface IPost {
  slug: string
  html: string
  attributes: { title: string; thumbnail: string }
}

interface IParams extends NextParsedUrlQuery {
  slug: string
}

interface IProps {
  blogpost: IPost
}

const Post = ({ blogpost }: IProps) => {
  if (!blogpost) return <div>not found</div>

  const { html, attributes } = blogpost

  return (
    <Layout>
      <article>
        <h1>{attributes.title}</h1>
        <img src={attributes.thumbnail} />
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = fs
    .readdirSync(path.join(process.cwd(), "content/blogPosts"))
    .map((blogName) => {
      const trimmedName = blogName.substring(0, blogName.length - 3)
      return {
        params: { slug: trimmedName },
      }
    })

  return {
    paths,
    fallback: false, // constrols whether not predefined paths should be processed on demand, check for more info: https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required
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
