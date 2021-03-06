const { i18n } = require("./next-i18next.config")
const withPreact = require("next-plugin-preact")

module.exports = withPreact({
  i18n,
  webpack: (configuration) => {
    configuration.module.rules.push({
      test: /\.md$/,
      use: "frontmatter-markdown-loader",
    })
    return configuration
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
})
