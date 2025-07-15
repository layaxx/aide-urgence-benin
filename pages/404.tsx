import Layout from "components/layouts/DefaultLayout"
import { GetStaticProps } from "next"
import { i18n } from "next-i18next.config"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export default function Custom404() {
  return (
    <Layout contact>
      <h1>404 - Page Not Found</h1>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? i18n.defaultLocale, [
        "common",
      ])),
    },
  }
}
