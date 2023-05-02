import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from '../../components/layout'
import Seo from '../../components/seo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

const StatePage = ({ pageContext, data }) => {
    console.log("State", pageContext);
    const parks = data.allPark.nodes;
    const state = data.allStatesJson.nodes[0];
    return (
        <Layout pageTitle={state.name}>
            <span><FontAwesomeIcon icon={faPenToSquare}  style={{color: "#f40101",}}/> Trip Report Available</span>
            <p>{parks.length} parks in list</p>
            {parks.map((park) => {
                    return (
                        <li key={park.parkCode}>
                            <Link to={"/parks/"+park.parkCode}>{park.name}
                            </Link>
                        </li>)
                })}
            <Link to="/states">Return to list of states</Link>
        </Layout>
    );
  };

  export const query = graphql`
  query ($abbreviation: String) {
    allPark(filter: {states: {glob: $abbreviation}}) {
        nodes {
            id
            fullName
            name
            states
            parkCode
            description
            images {
                title
                credit
                url
                caption
                }
            url
            activities {
                name
            }
            designation
        }
    }
    allStatesJson(filter: {abbreviation: {eq: $abbreviation}}) {
        nodes {
          name
          abbreviation
        }
      }
}
  `

  export const Head = () => <Seo title="State Parks"></Seo>

  export default StatePage