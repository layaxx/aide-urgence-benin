import YAML from "yaml"
import fs from "fs"
import config from "../next-i18next.config.js"

function generateFields(path) {
  const content = JSON.parse(fs.readFileSync(path, "utf8"))
  return Object.keys(content).map((key) => generateObject(content, key))
}

function generateObject(content, key) {
  if (typeof content[key] === "string") {
    return { label: key, name: key, widget: "string" }
  } else if (typeof content[key] === "object") {
    return {
      label: key,
      name: key,
      widget: "object",
      fields: Object.keys(content[key]).map((key_) =>
        generateObject(content[key], key_)
      ),
    }
  }
}

const file = fs.readFileSync("./scripts/config.yml", "utf8")
const preset = YAML.parse(file)
preset.local_backend = !(process.env.NODE_ENV === "production")

preset.i18n.default_locale = config.i18n.defaultLocale
preset.i18n.locales = config.i18n.locales

const translations =
  preset.collections[
    preset.collections.findIndex((entry) => entry.label === "translations")
  ]

let filePaths = config.i18n.locales
  .sort((s1, s2) => s1.localeCompare(s2))
  .flatMap((locale) =>
    fs.readdirSync("./public/locales/" + locale).map((filename) => ({
      locale,
      path: "./public/locales/" + locale + "/" + filename,
      filename,
    }))
  )

filePaths = filePaths.filter((obj) => !obj.path.endsWith("_old.json"))

translations.files = filePaths
  .sort((obj1, obj2) => obj1.filename.localeCompare(obj2.filename))
  .map((obj) => {
    const fields = generateFields(obj.path)
    return {
      label: `${obj.locale} - ${obj.filename}`,
      name: `${obj.locale} - ${obj.filename}`,
      file: obj.path,
      fields,
    }
  })

fs.writeFileSync("./public/admin/config.yml", YAML.stringify(preset), "utf8")

console.log("Successfully wrote CMS config")
