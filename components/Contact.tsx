import { useTranslation } from "next-i18next"
import { FormEventHandler, useState } from "react"

interface IFeedback {
  type: "error" | "success"
  text: string
}

export default function Contact() {
  const { t } = useTranslation()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const [isSending, setIsSending] = useState(false)

  const [feedback, setFeedback] = useState<IFeedback | undefined>(undefined)

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    if (message) {
      setIsSending(true)

      try {
        const res = await fetch("/api/contact", {
          body: JSON.stringify({
            email,
            name,
            message,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        })
        const { error } = await res.json()
        if (error) {
          console.log(error)
          setFeedback({ type: "error", text: t("contact.errors.default") })
          setIsSending(false)
          return
        }
      } catch {
        setFeedback({ type: "error", text: t("contact.errors.default") })
        setIsSending(false)
        return
      }

      setFeedback({ type: "success", text: t("contact.success") })
      setIsSending(false)

      setName("")
      setEmail("")
      setMessage("")
    } else {
      setFeedback({
        type: "error",
        text: t("contact.errors.message"),
      })
    }
  }

  return (
    <section aria-label={t("contact.label")}>
      <div className="container">
        <article>
          <hgroup>
            <h2>{t("contact.headings.first")}</h2>
            <h3>{t("contact.headings.second")}</h3>
          </hgroup>
          <form className="grid" onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              name="name"
              placeholder={t("contact.placeholders.name")}
              aria-label={t("contact.placeholders.name")}
              value={name}
              onChange={(event) => {
                if (event.target && "value" in event.target)
                  setName(String(event.target.value))
              }}
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder={t("contact.placeholders.email")}
              aria-label={t("contact.placeholders.email")}
              value={email}
              onChange={(event) => {
                if (event.target && "value" in event.target) {
                  setEmail(String(event.target.value))
                }
              }}
            />
            <textarea
              id="message"
              name="message"
              placeholder={t("contact.placeholders.message")}
              aria-label={t("contact.placeholders.message")}
              value={message}
              onChange={(event) => {
                if (event.target && "value" in event.target) {
                  setMessage(String(event.target.value))
                }
              }}
              required
            />
            <button type="submit" disabled={isSending}>
              {t("contact.btn")}
            </button>
          </form>
          {feedback && (
            <p
              style={{
                marginBottom: 0,
                paddingLeft: "1rem",
                borderLeft: `5px solid ${
                  feedback.type === "error"
                    ? "var(--pico-del-color)"
                    : "var(--pico-ins-color)"
                }`,
              }}
            >
              {feedback.text}
            </p>
          )}
          <p style={{ marginBottom: 0 }}>
            <small>{t("contact.legal")}</small>
          </p>
        </article>
      </div>
    </section>
  )
}
