import * as React from "react"
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout'
import Seo from '../components/seo'
import { TripReportExistsIcon } from '../components/trip_report'


const ParksPage = ({ data }) => {
    const parks = data.allPark.nodes;
    return (
        <Layout pageTitle="All Parks">
            <ul>
                {parks.map((park) => {
                    return (
                        <li key={park.parkCode}>
                            <Link to={"/parks/"+park.parkCode}>{park.name}
                            </Link>
                            <TripReportExistsIcon park={park}></TripReportExistsIcon>
                        </li>)
                })}
            </ul>
        </Layout>
    )
}

export const query = graphql`
query ParksPageQuery {    
    allPark {
        nodes {
            id
            fullName
            name
            parkCode
            description
            url
            images {
                title
                caption
                url
                credit
            }
        }
    }
}`
    
export const Head = () => <Seo title="Parks"></Seo>

export default ParksPage