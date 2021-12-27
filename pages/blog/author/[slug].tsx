import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NextParsedUrlQuery } from "next/dist/server/request-meta"
import { useRouter } from "next/router"
import Layout from "components/layouts/BlogLayout"
import { i18n } from "next-i18next.config"
import { IAuthor, INewBlogPost } from "types/Blog"
import { getAllAuthorPaths, getAuthorBySlug } from "lib/blog/authors"
import { useTranslation } from "next-i18next"
import { fetchAllBlogPosts, getBlogPostByAuthor } from "lib/blog/posts"
import BlogPostCard from "components/blog/BlogPostCard"
import Markdown from "markdown-to-jsx"

interface IParams extends NextParsedUrlQuery {
  slug: string
}

interface IProps {
  author: IAuthor | undefined
  posts: INewBlogPost[]
}

const AuthorPage = ({ author, posts }: IProps) => {
  if (!author) return <div>not found</div>

  const router = useRouter()
  const { t } = useTranslation()

  const localizedAttributes = author[router.locale ?? i18n.defaultLocale]

  return (
    <Layout>
      <h1>{localizedAttributes.name}</h1>
      <img src={localizedAttributes.portrait} />
      <br />
      <Markdown>{localizedAttributes.description}</Markdown>
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
      <h2>{t("blog:posts-by-author", { name: localizedAttributes.name })}</h2>
      <div>
        {posts.length
          ? posts.map((post, index) => (
              <BlogPostCard
                key={index}
                localizedPost={post[router.locale ?? i18n.defaultLocale]}
              />
            ))
          : t("blog:no-posts")}
      </div>
    </Layout>
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
  const posts = await getBlogPostByAuthor(params?.slug ?? "")

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
