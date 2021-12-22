const { i18n } = require("./next-i18next.config")

module.exports = {
  i18n,
  webpack: (configuration) => {
    // configuration.infrastructureLogging = { debug: /PackFileCache/ }
    configuration.module.rules.push({
      test: /\.md$/,
      use: "frontmatter-markdown-loader",
    })
    return configuration
  },
}
