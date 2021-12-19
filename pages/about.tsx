import Layout from "../components/DefaultLayout"
import { attributes, html } from "../content/about.md"

const About = () => (
  <Layout>
    <h1>{attributes.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: html }} />
  </Layout>
)

export default About
