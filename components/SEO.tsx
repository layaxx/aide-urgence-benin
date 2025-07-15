import Head from "next/head"
import { FC } from "react"
import settings from "lib/config.json"

interface IProps {
  openGraphType?: "website" | "article"
  url?: string
  title?: string
  description?: string
  image?: string
  createdAt?: string
  updatedAt?: string
}

const socialTags = ({
  openGraphType = "website",
  url,
  title,
  description,
  image,
  createdAt,
  updatedAt,
}: IProps) => {
  return [
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image:src", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "og:title", content: title },
    { name: "og:type", content: openGraphType },
    { name: "og:url", content: url },
    { name: "og:image", content: image },
    { name: "og:description", content: description },
    {
      name: "og:site_name",
      content: settings && settings.title,
    },
    {
      name: "og:published_time",
      content: createdAt || new Date().toISOString(),
    },
    {
      name: "og:modified_time",
      content: updatedAt || new Date().toISOString(),
    },
  ]
}

const SEO: FC<IProps> = (props) => {
  props = {
    title: settings?.title || props.title,
    description: settings?.meta?.description || props.description,
    image: settings?.meta?.graphic
      ? settings.baseurl + settings.meta.graphic
      : props.image,
    url: settings.baseurl || props.url,
  }

  const { title, description, image, url } = props
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={image} />

      {socialTags(props).map(({ name, content }) => {
        return <meta key={name} name={name} content={content} />
      })}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Article",
            name: title,
            about: description,
            url: url,
          }),
        }}
      />
    </Head>
  )
}

export default SEO
