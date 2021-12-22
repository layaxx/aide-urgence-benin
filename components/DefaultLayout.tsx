import { NextPage } from "next"
import Footer from "./Footer"
import Hero from "./Hero"

interface IProps {
  grid?: JSX.Element
}

const Layout: NextPage<IProps> = ({ children, grid }) => (
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
    </main>

    <Footer />
  </>
)

export default Layout
