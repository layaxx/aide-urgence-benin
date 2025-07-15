import { NextPage } from "next"
import Footer from "components/Footer"
import Hero from "components/Hero"
import Contact from "components/Contact"
import { JSX, PropsWithChildren } from "react"

interface IProps {
  grid?: JSX.Element
  contact?: boolean
}

const Layout: NextPage<PropsWithChildren<IProps>> = ({
  children,
  grid,
  contact,
}) => (
  <>
    <Hero />

    <main className="container">
      {grid ? (
        <div className="grid">
          <section>{children}</section>
          <aside>{grid}</aside>
        </div>
      ) : (
        <section>{children}</section>
      )}
      {contact && <Contact />}
    </main>

    <Footer />
  </>
)

export default Layout
