import { useTranslation } from "next-i18next"
import { useEffect, useState } from "react"

// eslint-disable-next-line no-unused-vars
enum Contrast {
  AUTO = "auto",
  DARK = "dark",
  LIGHT = "light",
}

function getInitialContrastValue(): Contrast {
  try {
    const loadedValue = localStorage?.getItem("contrast")
    switch (loadedValue) {
      case Contrast.DARK:
      case Contrast.LIGHT:
      case Contrast.AUTO:
        return loadedValue as Contrast
      default:
        return Contrast.AUTO
    }
  } catch (_error) {
    return Contrast.AUTO
  }
}

export default function ContrastSelector() {
  const { t } = useTranslation()

  const [contrast, setContrast] = useState<Contrast>(getInitialContrastValue())

  useEffect(() => {
    if (document === null) return

    document?.querySelector("html")?.setAttribute("data-theme", contrast)

    try {
      localStorage.setItem("contrast", contrast)
    } catch (_error) {}
  }, [contrast])

  // t('menu.theme.dark')
  // t('menu.theme.auto')
  // t('menu.theme.light')
  return (
    <>
      <li aria-label={t("menu.theme.label")}>
        <select
          name="locale"
          id="theme-switcher"
          onChange={(event) => {
            if (
              event.target &&
              "value" in event.target &&
              typeof event.target.value === "string" &&
              event.target.value !== contrast
            ) {
              setContrast(event.target.value as Contrast)
            }
          }}
        >
          <option value={contrast}>{t("menu.theme." + contrast)}</option>
          {Object.values(Contrast)
            .filter((str) => str !== contrast)
            .map((contrastOption) => (
              <option value={contrastOption} key={contrastOption}>
                {t("menu.theme." + contrastOption)}
              </option>
            ))}
        </select>
      </li>
    </>
  )
}
