import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { GetStaticProps, NextPage } from "next/types"
import Layout from "components/layouts/DefaultLayout"
import { attributes } from "content/projects.md"
import { i18n } from "next-i18next.config"
import { useRouter } from "next/router"
import SEO from "components/SEO"
import config from "lib/config.json"
import { getLocale } from "lib/locale"
import ProjectCard from "components/projects/ProjectCard"
import { ILocalizedProject } from "types/Projects"

import styles from "./index.module.css"

interface IProps {
  projects: ILocalizedProject[]
}

const Home: NextPage<IProps> = ({ projects }) => {
  const { locale } = useRouter()

  return (
    <>
      <SEO url={`${config.baseurl}`} />

      <Layout>
        <h1>{attributes[locale ?? i18n.defaultLocale].title}</h1>

        <div className={styles.container}>
          {projects.map((project) => (
            <ProjectCard project={project} key={project.name} />
          ))}
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps<IProps> = async ({ locale }) => {
  const projects = attributes[getLocale(locale)].projects

  return {
    props: {
      ...(await serverSideTranslations(getLocale(locale), [
        "common",
        "blog",
        "home",
      ])),
      projects,
    },
  }
}

export default Home
