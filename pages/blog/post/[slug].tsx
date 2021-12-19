import fs from "fs"
import path from "path"
import Layout from "../../../components/DefaultLayout"

export interface IPost {
  slug: string
  html: string
  attributes: { title: string; thumbnail: string }
}

const Post = ({ blogpost }: { blogpost: IPost }) => {
  if (!blogpost) return <div>not found</div>

  const { html, attributes } = blogpost

  return (
    <Layout>
      <article>
        <h1>{attributes.title}</h1>
        <img src={attributes.thumbnail} />
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = fs
    .readdirSync(path.join(process.cwd(), "content/blogPosts"))
    .map((blogName) => {
      const trimmedName = blogName.substring(0, blogName.length - 3)
      return {
        params: { slug: trimmedName },
      }
    })

  return {
    paths,
    fallback: false, // constrols whether not predefined paths should be processed on demand, check for more info: https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required
  }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { slug } = params

  const post = await import(`../../../content/blogPosts/${slug}.md`).catch(
    () => null
  )

  return {
    props: {
      blogpost: post.default,
    },
  }
}

export default Post
