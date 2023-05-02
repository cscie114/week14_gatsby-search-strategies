
import * as React from "react";
import { useStaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { GatsbyImage, getImage } from "gatsby-plugin-image"


const TripReport = ({ park }) => {
  const trip_report = GetTripReport(park);
  const featuredImg = getImage(trip_report?.frontmatter?.image?.childImageSharp?.gatsbyImageData)
  if (trip_report){
      return (
          <div>
              <h1 id="tr">Trip Report <span><FontAwesomeIcon icon={faPenToSquare}  style={{color: "#f40101",}}/></span>
</h1>
              <p>{trip_report.frontmatter.date}</p>
              <h3>{trip_report.frontmatter.title}</h3>   
              <GatsbyImage image={featuredImg} />             
              <div dangerouslySetInnerHTML={{ __html: trip_report.html }}>     
              </div>
          </div>
      );
  }else{
      return (<div></div>);
  }
};

const TripReportExistsIcon = ({park}) => {
  const trip_report = GetTripReport(park);
  if (trip_report){
      return (<span>  <FontAwesomeIcon icon={faPenToSquare}  style={{color: "#f40101",}} /></span>);
  }
};

const GetTripReport = (park) => {
    const data = useStaticQuery(graphql`
    query  {
        allMarkdownRemark {
          nodes {
            frontmatter {
              parkCode
              title
              slug
              date
              image {
                childImageSharp {
                  gatsbyImageData(
                    width: 800
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
                }
              }
            }
            html
          }
        }
      }
    `)
    return data.allMarkdownRemark.nodes.find(el => el.frontmatter.parkCode == park.parkCode);
}
export { TripReport, TripReportExistsIcon }
