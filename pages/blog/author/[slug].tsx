import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NextParsedUrlQuery } from "next/dist/server/request-meta"
import { useRouter } from "next/router"
import Layout from "components/layouts/BlogLayout"
import { i18n } from "next-i18next.config"
import { IAuthor, INewBlogPost } from "types/Blog"
import { getAllAuthorPaths, getAuthorBySlug } from "lib/blog/authors"
import { useTranslation } from "next-i18next"
import { getBlogPostsByAuthor } from "lib/blog/posts"
import Markdown from "markdown-to-jsx"
import Image from "next/image"
import BlogPostCardContainer from "components/blog/BlogPostCardContainer"
import SEO from "components/SEO"
import config from "lib/config"

interface IParams extends NextParsedUrlQuery {
  slug: string
}

interface IProps {
  author: IAuthor | undefined
  posts: INewBlogPost[]
}

const AuthorPage = ({ author, posts }: IProps) => {
  const router = useRouter()
  const { t } = useTranslation()

  if (!author) return <div>not found</div>

  const localizedAttributes = author[router.locale ?? i18n.defaultLocale]

  return (
    <>
      <SEO
        url={`${config.baseurl}/blog/author/${localizedAttributes.slug}`}
        title={localizedAttributes.name}
        description={
          localizedAttributes.description &&
          localizedAttributes.description.slice(160)
        }
        image={
          localizedAttributes.portrait &&
          config.baseurl + localizedAttributes.portrait
        }
      />

      <Layout>
        <h1>{localizedAttributes.name}</h1>
        <div style={{ position: "relative", width: "10rem", height: "10rem" }}>
          <Image
            src={localizedAttributes.portrait}
            alt={"portrait " + localizedAttributes.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <Markdown>{localizedAttributes.description ?? ""}</Markdown>
        {localizedAttributes.socials?.length && (
          <>
            <h2>{t("blog:heading.socials")}</h2>
            <ul>
              {localizedAttributes.socials.map((entry, index) => (
                <li key={index}>
                  <a href={entry.url}>{entry.name}</a>
                </li>
              ))}
            </ul>
          </>
        )}

        <h2>
          {t("blog:heading.posts-by-author", {
            name: localizedAttributes.name,
          })}
        </h2>
        <BlogPostCardContainer
          posts={posts.map((post) => post[router.locale ?? i18n.defaultLocale])}
        />
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  const paths = await getAllAuthorPaths()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<IProps, IParams> = async ({
  params,
  locale,
}) => {
  const author = await getAuthorBySlug(params?.slug ?? "", locale)
  const posts = await getBlogPostsByAuthor(params?.slug ?? "")

  return {
    props: {
      ...(await serverSideTranslations(locale ?? i18n.defaultLocale, [
        "common",
        "blog",
      ])),
      author,
      posts,
    },
  }
}

export default AuthorPage
