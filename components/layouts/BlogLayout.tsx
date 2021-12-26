import Footer from "components/Footer"
import Navbar from "components/Navbar"
import { FC } from "react"

import styles from "./BlogLayout.module.css"

const Layout: FC = ({ children }) => (
  <>
    <div data-theme="dark" className={styles.navbarContainer}>
      <Navbar />
    </div>

    <main className="container">
      <article className={styles.article}>{children}</article>
    </main>

    <Footer />
  </>
)

export default Layout
