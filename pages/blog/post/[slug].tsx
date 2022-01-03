import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NextParsedUrlQuery } from "next/dist/server/request-meta"
import { useRouter } from "next/router"
import Layout from "components/layouts/BlogLayout"
import { i18n } from "next-i18next.config"
import { INavigationData, INewBlogPost } from "types/Blog"
import {
  getAllBlogPostPaths,
  getBlogPostBySlug,
  getNavigationDataForBlog,
} from "lib/blog/posts"
import AuthorHighlight from "components/blog/AuthorHighlight"
import dayjs from "dayjs"
import { useTranslation } from "next-i18next"
import Markdown from "markdown-to-jsx"
import { FC } from "react"
import BlogNavigation from "components/blog/BlogNavigation"
import Image from "next/image"
import styles from "./[slug].module.css"
import TagCard from "components/blog/TagCard"
import ShareButtons from "components/blog/ShareButtons"
import SEO from "components/SEO"
import config from "lib/config"

interface IParams extends NextParsedUrlQuery {
  slug: string
}

interface IProps {
  post: INewBlogPost | undefined
  navigationData: INavigationData
}

const Post: FC<IProps> = ({ post, navigationData }) => {
  const router = useRouter()
  const { t } = useTranslation()

  if (!post) return <div>not found</div>

  const localizedAttributes = post[router.locale ?? i18n.defaultLocale]

  return (
    <>
      <SEO
        url={`${config.baseurl}/blog/post/${localizedAttributes.slug}`}
        title={localizedAttributes.title}
        description={
          localizedAttributes.body && localizedAttributes.body.slice(160)
        }
        createdAt={dayjs(localizedAttributes.date).toISOString()}
        image={
          localizedAttributes.thumbnail &&
          config.baseurl + localizedAttributes.thumbnail
        }
      />

      <Layout>
        {localizedAttributes.thumbnail && (
          <div style={{ position: "relative", width: "100%", height: "20rem" }}>
            <Image
              src={localizedAttributes.thumbnail}
              alt="thumbnail"
              layout="fill"
              objectFit="cover"
            />
          </div>
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
        <br />

        {localizedAttributes.tags.length && (
          <div className={styles.tags}>
            {localizedAttributes.tags.map((tag) => (
              <TagCard tag={tag} key={tag.slug} />
            ))}
          </div>
        )}

        <Markdown>{localizedAttributes.body ?? ""}</Markdown>

        <ShareButtons />

        <BlogNavigation data={navigationData} />

        {localizedAttributes.author && (
          <>
            <h2>{t("blog:heading.about-the-author")}</h2>
            <AuthorHighlight author={localizedAttributes.author} />
          </>
        )}
      </Layout>
    </>
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
  const navigationData = await getNavigationDataForBlog(
    params?.slug ?? "",
    locale
  )

  return {
    props: {
      ...(await serverSideTranslations(locale ?? i18n.defaultLocale, [
        "common",
        "blog",
      ])),
      post,
      navigationData,
    },
  }
}

export default Post
