const { i18n } = require("./next-i18next.config")

module.exports = {
  i18n,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "frontmatter-markdown-loader",
    })
    return config
  },
  async redirects() {
    return [
      {
        source: "/config.yml",
        destination: "/admin/config.yml",
        permanent: true,
      },
    ]
  },
}
