import Footer from "./Footer"
import Hero from "./Hero"

const Layout = ({ children }: { children: any }) => (
  <>
    <Hero />

    <main className="container">
      <div className="grid">
        <section>{children}</section>

        <aside></aside>
      </div>
    </main>

    <Footer />
  </>
)

export default Layout
