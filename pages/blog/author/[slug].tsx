import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NextParsedUrlQuery } from "next/dist/server/request-meta"
import { useRouter } from "next/router"
import Layout from "components/layouts/BlogLayout"
import { Author, BlogPost } from "types/Blog"
import { getAllAuthorPaths, getAuthorBySlug } from "lib/blog/authors"
import { useTranslation } from "next-i18next"
import { getBlogPostsByAuthor } from "lib/blog/posts"
import Markdown from "markdown-to-jsx"
import Image from "next/image"
import BlogPostCardContainer from "components/blog/BlogPostCardContainer"
import SEO from "components/SEO"
import config from "lib/config"
import { getLocale } from "lib/locale"

interface IParams extends NextParsedUrlQuery {
  slug: string
}

interface IProps {
  author: Author | undefined
  posts: BlogPost[]
}

const AuthorPage = ({ author, posts }: IProps) => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  if (!author) return <div>not found</div>

  const localizedAttributes = author.localized[getLocale(locale)]

  return (
    <>
      <SEO
        url={`${config.baseurl}/blog/author/${author.slug}`}
        title={author.name}
        description={
          localizedAttributes.description &&
          localizedAttributes.description.slice(160)
        }
        image={author.portrait && config.baseurl + author.portrait}
      />
      <Layout>
        <h1>{author.name}</h1>
        <div style={{ position: "relative", width: "10rem", height: "10rem" }}>
          <Image
            src={author.portrait.replace("/public/", "/")}
            alt={"portrait " + author.name}
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
            }}
          />
        </div>
        <Markdown>{localizedAttributes.description ?? ""}</Markdown>
        {author.socials?.length && (
          <>
            <h2>{t("blog:heading.socials")}</h2>
            <ul>
              {author.socials.map((entry, index) => (
                <li key={index}>
                  <a href={entry.url}>{entry.name}</a>
                </li>
              ))}
            </ul>
          </>
        )}

        <h2>
          {t("blog:heading.posts-by-author", {
            name: author.name,
          })}
        </h2>
        <BlogPostCardContainer posts={posts} />
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
  const author = await getAuthorBySlug(params?.slug ?? "")
  const posts = await getBlogPostsByAuthor(params?.slug ?? "")

  return {
    props: {
      ...(await serverSideTranslations(getLocale(locale), ["common", "blog"])),
      author,
      posts,
    },
  }
}

export default AuthorPage
