import type { AppProps } from "next/app"
import { appWithTranslation } from "next-i18next"
import "@picocss/pico/css/pico.min.css"
import "public/static/css/index.css"
import "@fontsource/spectral"
import Head from "next/head"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default appWithTranslation(MyApp)
