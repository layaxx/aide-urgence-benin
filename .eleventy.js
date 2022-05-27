module.exports = function (config) {
  config.addPassthroughCopy({ public: "./" })

  config.setBrowserSyncConfig({
    files: ["dist/**/*"],
  })

  config.addPassthroughCopy({ public: "." })

  return {
    templateFormats: ["md", "njk", "jpg", "png", "gif"],
    dir: {
      input: "src",
      output: "_site",
      layouts: "_js/_includes/layouts",
    },
  }
}
