export default function Contact() {
  return (
    <section aria-label="Subscribe example">
      <div className="container">
        <article>
          <hgroup>
            <h2>Subscribe</h2>
            <h3>Litora torquent per conubia nostra</h3>
          </hgroup>
          <form className="grid">
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="First name"
              aria-label="First name"
              required
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
              aria-label="Email address"
              required
            />
            <button
              type="submit"
              onClick={/* TODO: */ (event) => event.preventDefault()}
            >
              Subscribe
            </button>
          </form>
        </article>
      </div>
    </section>
  )
}
