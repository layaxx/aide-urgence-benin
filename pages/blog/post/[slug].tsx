import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NextParsedUrlQuery } from "next/dist/server/request-meta"
import { useRouter } from "next/router"
import Layout from "components/layouts/BlogLayout"
import { i18n } from "next-i18next.config"
import { INewBlogPost } from "types/Blog"
import { getAllBlogPostPaths, getBlogPostBySlug } from "lib/blog/posts"
import AuthorHighlight from "components/blog/AuthorHighlight"
import dayjs from "dayjs"
import { useTranslation } from "next-i18next"

import styles from "./[slug].module.css"

interface IParams extends NextParsedUrlQuery {
  slug: string
}

interface IProps {
  post: INewBlogPost | undefined
}

const Post = ({ post }: IProps) => {
  if (!post) return <div>not found</div>

  const router = useRouter()

  const { t } = useTranslation()

  const localizedAttributes = post[router.locale ?? i18n.defaultLocale]

  return (
    <Layout>
      {localizedAttributes.thumbnail && (
        <img src={localizedAttributes.thumbnail} className={styles.thumbnail} />
      )}
      <h1>{localizedAttributes.title}</h1>
      <small>
        {t("blog:published-by", {
          name: localizedAttributes.author?.name ?? "anon",
          date: dayjs(localizedAttributes.date)
            .toDate()
            .toLocaleString(router.locale ?? i18n.defaultLocale),
        })}
      </small>

      {localizedAttributes.author && (
        <AuthorHighlight author={localizedAttributes.author} />
      )}
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
      post,
    },
  }
}

export default Post
