import { fetchAllAuthors } from "lib/blog/authors"
import { fetchAllBlogPosts } from "lib/blog/posts"
import cfg from "lib/config"
import { NextApiResponse } from "next"
import { Author, BlogPost } from "types/Blog"

function generateSiteMap(posts: BlogPost[], authors: Author[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <url>
         <loc>${cfg.baseurl}</loc>
       </url>
       <url>
         <loc>${cfg.baseurl}/blog</loc>
       </url>
       ${posts
         .map(({ slug }) => {
           return `
         <url>
             <loc>${`${cfg.baseurl}/blog/post/${slug}`}</loc>
         </url>
       `
         })
         .join("")}
         ${authors
           .map(({ slug }) => {
             return `
            <url>
                <loc>${`${cfg.baseurl}/blog/author/${slug}`}</loc>
            </url>
          `
           })
           .join("")}
     </urlset>
   `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
  const posts = await fetchAllBlogPosts()
  const authors = await fetchAllAuthors()

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts, authors)

  res.setHeader("Content-Type", "text/xml")
  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
