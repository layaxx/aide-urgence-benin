import { NextPage } from "next"
import Footer from "./Footer"
import Hero from "./Hero"

const Layout: NextPage = ({ children }) => (
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
