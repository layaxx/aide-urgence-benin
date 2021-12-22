import { useTranslation } from "next-i18next"
import { useEffect, useState } from "react"

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

  return (
    <>
      <li>
        <a
          href="#"
          className="contrast"
          onClick={(e) => {
            e.preventDefault()
            setContrast(Contrast.AUTO)
          }}
        >
          {t("menu.theme.auto")}
        </a>
      </li>
      <li>
        <a
          href="#"
          className="contrast"
          onClick={(e) => {
            e.preventDefault()
            setContrast(Contrast.LIGHT)
          }}
        >
          {t("menu.theme.light")}
        </a>
      </li>
      <li>
        <a
          href="#"
          className="contrast"
          onClick={(e) => {
            e.preventDefault()
            setContrast(Contrast.DARK)
          }}
        >
          {t("menu.theme.dark")}
        </a>
      </li>
    </>
  )
}
