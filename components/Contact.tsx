import { useTranslation } from "next-i18next"

export default function Contact() {
  const { t } = useTranslation()

  return (
    <section aria-label={t("contact.label")}>
      <div className="container">
        <article>
          <hgroup>
            <h2>{t("contact.headings.first")}</h2>
            <h3>{t("contact.headings.second")}</h3>
          </hgroup>
          <form className="grid">
            <input
              type="text"
              id="name"
              name="name"
              placeholder={t("contact.placeholders.name")}
              aria-label={t("contact.placeholders.name")}
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder={t("contact.placeholders.email")}
              aria-label={t("contact.placeholders.email")}
            />
            <textarea
              id="message"
              name="message"
              placeholder={t("contact.placeholders.message")}
              aria-label={t("contact.placeholders.message")}
              required
            />
            <button
              type="submit"
              onClick={/* TODO: */ (event) => event.preventDefault()}
            >
              {t("contact.btn")}
            </button>
          </form>
          <p style={{ marginBottom: 0 }}>
            <small>
              You may contact us anonymously, i.e. without providing your name
              or email address. Without your email address we cannot get in
              touch with you however.
            </small>
          </p>
        </article>
      </div>
    </section>
  )
}
