import * as React from "react"
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'

const IndexPage = () => {
  return (
    <Layout pageTitle="CSCI E114 Assignment 4 Page">
      <div>
        <p>Explore {" "}
          <Link to="/parks">all national parks</Link>, {" "}
          <Link to="/states">parks in each state</Link>, {" "}
        </p>
        <StaticImage  src="../images/acadia.jpg" 
          height={600} 
          alt="Acadia's rocky coastline - NPS / Kristi Rugg"
          placeholder="blurred"
          loading="eager"
          transformOptions={{grayscale:"true"}}>
          </StaticImage>
      </div>
    </Layout>
  )
}

export default IndexPage

export const Head = () => <title>CSCI E114 Assignment 4 Page</title>
