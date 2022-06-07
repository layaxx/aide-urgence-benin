import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { GetStaticProps, NextPage } from "next/types"
import Image from "next/image"
import Layout from "components/layouts/BlogLayout"
import { i18n } from "next-i18next.config"
import SEO from "components/SEO"
import config from "lib/config.json"
import { getLocale } from "lib/locale"
import { Gallery } from "types/Gallery"
import { attributes } from "content/gallery.md"
import { Locale } from "types/Blog"

interface IProps {
  gallery: Gallery
}

const GalleriesPage: NextPage<IProps> = ({ gallery }) => {
  console.log(gallery.images)

  return (
    <>
      <SEO url={`${config.baseurl}`} />

      <Layout>
        <h1>{gallery.title}</h1>

        <section style={{ display: "flex" }}>
          {gallery.images.map((src) => (
            <div
              key={src}
              style={{
                margin: "2rem",
                height: "10rem",
                width: "20rem",
                background: "var(--background-color)",
                position: "relative",
              }}
              data-theme="dark"
            >
              <Image
                src={src.replace("/public/", "/")}
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </section>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps<IProps> = async ({ locale }) => {
  const actualLocale: Locale = getLocale(locale)

  const gallery: Gallery = attributes[actualLocale]

  if (actualLocale !== i18n.defaultLocale) {
    gallery.images = attributes[i18n.defaultLocale].images ?? []
  }

  console.log(gallery.images)

  return {
    props: {
      ...(await serverSideTranslations(actualLocale, ["common"])),
      gallery,
    },
  }
}

export default GalleriesPage
