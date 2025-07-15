import { useRouter } from "next/router"

export default function LocaleSelector() {
  const router = useRouter()

  return (
    <select
      name="locale"
      id="locale-switcher"
      onChange={(event) => {
        if (event.target.value !== router.locale) {
          router.replace(router.asPath, router.asPath, {
            locale: event.target.value,
          })
        }
      }}
    >
      <option value={router.locale}>{router.locale}</option>
      {(router.locales ?? [])
        .filter((locale) => locale !== router.locale)
        .map((locale) => (
          <option value={locale} key={locale}>
            {locale}
          </option>
        ))}
    </select>
  )
}
