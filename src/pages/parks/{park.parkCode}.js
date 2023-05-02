import * as React from 'react'
import {graphql} from 'gatsby'
import Layout from '../../components/layout'
import Park from '../../components/park'
import { TripReport } from '../../components/trip_report'


const ParkPost = ({ data, pageContext }) => {   //important these are all rpoperites on props object, which contains context, id, etc.
    console.log(data);
    console.log(pageContext)
    const {allPark} = data;
    const park = allPark.nodes[0];
    return (
      <Layout pageTitle={park.name}>
      <div>
       <Park park={park}></Park>
       <TripReport park={park}></TripReport>
      </div>
      </Layout>
   )
 }
 
 export const query = graphql`
 query ($parkCode: String) {
    allPark(filter: {parkCode: {eq: $parkCode}}) {
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
        }
      }
    }
  }`
 

 export default ParkPost