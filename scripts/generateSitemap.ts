import { writeFileSync } from "fs"
import cfg from "../lib/config"

async function generate() {
  const pages = ["index.html", "imprint.html"]

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map((path) => {
            const route = path === "/index" ? "" : path

            return `
              <url>
                  <loc>${`${cfg.baseurl}${route}`}</loc>
              </url>
            `
          })
          .join("")}
    </urlset>
    `

  // eslint-disable-next-line no-sync
  writeFileSync("public/sitemap.xml", sitemap)
}

generate()
