import Link from "next/link"
import { ILocalizedTag } from "types/Blog"

interface IProps {
  tag: ILocalizedTag
}

const TagCard: React.FC<IProps> = ({ tag }) => {
  return (
    <Link href="/blog/tag/[slug]" as={"/blog/tag/" + tag.slug}>
      <a
        title={tag.title}
        style={{ background: "var(--card-background-color)" }}
      >
        {tag.title}
      </a>
    </Link>
  )
}

export default TagCard
