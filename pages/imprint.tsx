import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { GetStaticProps, NextPage } from "next/types"
import Layout from "components/layouts/DefaultLayout"
import { attributes } from "content/imprint.md"
import { i18n } from "next-i18next.config"
import { useRouter } from "next/router"
import Markdown from "markdown-to-jsx"
import SEO from "components/SEO"
import config from "lib/config"

const Imprint: NextPage = () => {
  const { locale } = useRouter()
  return (
    <>
      <SEO url={`${config.baseurl}/imprint`} />

      <Layout>
        <h1>{attributes[locale ?? i18n.defaultLocale].title}</h1>
        <div>
          <Markdown>
            {attributes[locale ?? i18n.defaultLocale].body ?? ""}
          </Markdown>
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? i18n.defaultLocale, [
        "common",
        "blog",
        "home",
      ])),
    },
  }
}

export default Imprint
