import { getLocale } from "lib/locale"
import Link from "next/link"
import { useRouter } from "next/router"
import { ITag } from "types/Blog"

interface IProps {
  tag: ITag
}

const TagCard: React.FC<IProps> = ({ tag }) => {
  const router = useRouter()
  const locale = getLocale(router.locale)

  const title = tag.localized[locale].title

  return (
    <Link
      href="/blog/tag/[slug]"
      as={"/blog/tag/" + tag.slug}
      title={title}
      style={{ background: "var(--pico-card-background-color)" }}
    >
      {title}
    </Link>
  )
}

export default TagCard
