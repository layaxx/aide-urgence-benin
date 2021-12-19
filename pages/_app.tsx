import type { AppProps } from "next/app"
import "@picocss/pico/css/pico.min.css"
import "../public/static/css/index.css"

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
