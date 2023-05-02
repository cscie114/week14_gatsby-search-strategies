import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";

const Seo = ({ title }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          course
        }
      }
    }
  `);

  // gather data to simplify markup below
  const seo = {
    title: data.site.siteMetadata.title,
    description: data.site.siteMetadata.description,
    keywords: `gatsby, nps, ${data.site.siteMetadata.course}`,
  };

  return (
    <>
      <html lang="en" />
      <title>
        {title} | {seo.title}
      </title>
      <meta name="description" content="{seo.description}" />
      <meta name="keywords" content="{seo.keywords}"></meta>
    </>
  );
};

export default Seo;
