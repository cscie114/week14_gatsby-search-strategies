import * as React from "react"
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout'
import Seo from '../components/seo'

const StatesPage = ({ data }) => {
    const states = data.allStatesJson.nodes;
    return (
        <Layout pageTitle="State Parks">
            <ul>
                {states.map((state) => {
                    return (
                        <li key={state.abbreviation}>
                            <Link to={"/states/"+state.abbreviation.toLowerCase()}>{state.name} ({state.abbreviation})</Link>
                        </li>)
                })}
            </ul>
        </Layout>
    )
}

export const query = graphql`
    query StatesPageQuery {
        allStatesJson {
            nodes {
                name
                abbreviation
            }
        }
    }
`

export const Head = () => <Seo title="States"></Seo>

export default StatesPage