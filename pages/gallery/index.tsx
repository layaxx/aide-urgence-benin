import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { GetStaticProps, NextPage } from "next/types"
import Image from "next/image"
import Layout from "components/layouts/BlogLayout"
import { i18n } from "next-i18next.config"
import SEO from "components/SEO"
import config from "lib/config.json"
import { getLocale } from "lib/locale"
import { FlatGallery, Gallery, GalleryImage } from "types/Gallery"
import { attributes } from "content/gallery.md"
import { Locale } from "types/Blog"
import { useEffect, useState } from "react"
import { normalizeImages } from "lib/images"

import styles from "./index.module.css"

interface IProps {
  gallery: Gallery
}

const GalleriesPage: NextPage<IProps> = ({ gallery }) => {
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null)

  const activeIndex =
    activeImage === null ? -1 : gallery.images.indexOf(activeImage)

  function nextImage(backwards = false): GalleryImage | null {
    if (!activeImage) return null
    const { images } = gallery
    if (backwards) {
      if (activeIndex === 0) return activeImage
      return images[activeIndex - 1]
    }
    if (activeIndex === images.length - 1) return activeImage
    return images[activeIndex + 1]
  }

  useEffect(() => {
    const close: React.KeyboardEventHandler = (event: React.KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          setActiveImage(null)
          break
      }
    }
    window.addEventListener("keydown", close as unknown as EventListener)
    return () =>
      window.removeEventListener("keydown", close as unknown as EventListener)
  }, [])

  return (
    <>
      <SEO url={`${config.baseurl}`} />

      <dialog
        open={Boolean(activeImage)}
        onClick={(evt) => {
          if ((evt?.target as HTMLElement)?.tagName === "DIALOG")
            setActiveImage(null)
        }}
      >
        <article style={{ width: "100vw", position: "absolute" }}>
          <header>
            <a
              aria-label="Close"
              className="close"
              onClick={() => setActiveImage(null)}
            />
          </header>

          {Boolean(activeImage?.path) && (
            <Image
              src={String(activeImage?.path)}
              alt=""
              layout="responsive"
              width={activeImage?.width}
              height={activeImage?.height}
            />
          )}

          {activeIndex !== 0 && (
            <span
              className={styles.navigation}
              onClick={() => setActiveImage(nextImage(true))}
              data-pos="left"
            >
              <i className={styles.arrow + " " + styles.left} />
            </span>
          )}
          {activeIndex !== gallery.images.length - 1 && (
            <span
              className={styles.navigation}
              onClick={(event) =>
                event.button === 0 && setActiveImage(nextImage())
              }
              data-pos="right"
            >
              <i className={styles.arrow + " " + styles.right} />
            </span>
          )}
        </article>
      </dialog>

      <Layout>
        <h1>{gallery.title}</h1>

        <section
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {gallery.images.map((img) => (
            <div
              key={img.path}
              className={styles.preview}
              data-theme="dark"
              onClick={() => setActiveImage(img)}
            >
              <Image src={img.path} alt="" layout="fill" objectFit="cover" />
            </div>
          ))}
        </section>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps<IProps> = async ({ locale }) => {
  const actualLocale: Locale = getLocale(locale)

  const flatGallery: FlatGallery = attributes[actualLocale]

  if (actualLocale !== i18n.defaultLocale) {
    flatGallery.images = attributes[i18n.defaultLocale].images ?? []
  }

  const gallery = {
    ...flatGallery,
    images: normalizeImages(flatGallery.images),
  }

  return {
    props: {
      ...(await serverSideTranslations(actualLocale, ["common"])),
      gallery,
    },
  }
}

export default GalleriesPage
