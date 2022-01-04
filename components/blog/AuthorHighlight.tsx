import Link from "next/link"
import { Author } from "types/Blog"

import styles from "./AuthorHighlight.module.css"

interface IProps {
  author: Author
}

const AuthorHighlight: React.FC<IProps> = ({ author }) => {
  return (
    <section className={styles.root}>
      <Link href="/blog/author/[slug]" as={`/blog/author/${author.name}`}>
        <a>{author.name}</a>
      </Link>
    </section>
  )
}

export default AuthorHighlight
