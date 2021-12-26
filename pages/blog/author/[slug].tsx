import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NextParsedUrlQuery } from "next/dist/server/request-meta"
import { useRouter } from "next/router"
import Layout from "components/layouts/BlogLayout"
import { i18n } from "next-i18next.config"
import { IAuthor } from "types/Blog"
import { getAllAuthorPaths, getAuthorBySlug } from "lib/blog/authors"
import { useTranslation } from "next-i18next"

interface IParams extends NextParsedUrlQuery {
  slug: string
}

interface IProps {
  author: IAuthor | undefined
}

const AuthorPage = ({ author }: IProps) => {
  if (!author) return <div>not found</div>

  const router = useRouter()
  const { t } = useTranslation()

  const localizedAttributes = author[router.locale ?? i18n.defaultLocale]

  return (
    <Layout>
      <h1>{localizedAttributes.name}</h1>
      <img src={localizedAttributes.portrait} />
      <p>{localizedAttributes.description}</p>
      {localizedAttributes.socials?.length && (
        <>
          <h2>{t("blog:heading:socials")}</h2>
          <ul>
            {localizedAttributes.socials.map((entry, index) => (
              <li key={index}>
                <a href={entry.url}>{entry.name}</a>
              </li>
            ))}
          </ul>
        </>
      )}
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

  return {
    props: {
      ...(await serverSideTranslations(locale ?? i18n.defaultLocale, [
        "common",
        "blog",
      ])),
      author,
    },
  }
}

export default AuthorPage
