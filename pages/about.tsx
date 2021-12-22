import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { GetStaticProps } from "next/types"
import Layout from "components/DefaultLayout"
import { attributes, html } from "content/about.md"
import { i18n } from "next-i18next.config"

const About = () => (
  <Layout>
    <h1>{attributes.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: html }} />
  </Layout>
)

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? i18n.defaultLocale, [
        "common",
        "about",
      ])),
    },
  }
}
export default About
