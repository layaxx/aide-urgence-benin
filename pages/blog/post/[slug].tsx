import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NextParsedUrlQuery } from "next/dist/server/request-meta"
import { useRouter } from "next/router"
import Layout from "components/layouts/BlogLayout"
import { i18n } from "next-i18next.config"
import { INavigationData, BlogPost } from "types/Blog"
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
import { getLocale } from "lib/locale"
import Link from "next/link"

interface IParams extends NextParsedUrlQuery {
  slug: string
}

interface IProps {
  post: BlogPost | undefined
  navigationData: INavigationData
}

const Post: FC<IProps> = ({ post, navigationData }) => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  if (!post) return <div>not found</div>

  const localizedAttributes = post.localized[getLocale(locale)]

  if (!localizedAttributes) {
    return (
      <Layout>
        <h1>{t("blog:locale-not-available", { locale: getLocale(locale) })}</h1>
        <p>{t("blog:other-locales")}</p>
        <ul>
          {Array.from(post.availableLocales).map((locale) => (
            <li key="locale">
              <Link
                href="/blog/post/[slug]"
                as={"/blog/post/" + post.slug}
                locale={locale}
              >
                <a>{locale}</a>
              </Link>
            </li>
          ))}
        </ul>

        <ShareButtons />

        <BlogNavigation data={navigationData} />

        {post.author && (
          <>
            <h2>{t("blog:heading.about-the-author")}</h2>
            <AuthorHighlight author={post.author} />
          </>
        )}
      </Layout>
    )
  }

  return (
    <>
      <SEO
        url={`${config.baseurl}/blog/post/${post.slug}`}
        title={localizedAttributes.title}
        description={
          localizedAttributes.body && localizedAttributes.body.slice(160)
        }
        createdAt={dayjs(post.date).toISOString()}
        image={post.thumbnail && config.baseurl + post.thumbnail}
      />

      <Layout>
        {post.thumbnail && (
          <div style={{ position: "relative", width: "100%", height: "20rem" }}>
            <Image
              src={post.thumbnail.replace("/public/", "/")}
              alt="thumbnail"
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
        <h1>{localizedAttributes.title}</h1>

        <small>
          {t("blog:published-by", {
            name: post.author?.name ?? "anon",
            date: dayjs(post.date).toDate().toLocaleString(getLocale(locale)),
          })}
        </small>
        <br />

        {post.tags.length && (
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <TagCard tag={tag} key={tag.slug} />
            ))}
          </div>
        )}

        <Markdown>{localizedAttributes.body ?? ""}</Markdown>

        <ShareButtons />

        <BlogNavigation data={navigationData} />

        {post.author && (
          <>
            <h2>{t("blog:heading.about-the-author")}</h2>
            <AuthorHighlight author={post.author} />
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
  const post = await getBlogPostBySlug(params?.slug ?? "")
  const navigationData = await getNavigationDataForBlog(
    params?.slug ?? "",
    getLocale(locale)
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
