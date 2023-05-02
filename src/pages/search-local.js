import React from "react";
import { useState } from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import * as searchStyles from "./search.module.css"

// Utility function to lowercase the title and explanation for searching
const normalizeNode = (node) => {
    return {
        ...node,
        name: node.name.toLowerCase(),
        fullNameNorm: node.fullName.toLowerCase(),
        description: node.description.toLowerCase(),
        parkCode: node.parkCode.toLowerCase(),
        tr: node.tripReport?.frontmatter?.title.toLowerCase() + ' ' + node.tripReport?.html.toLowerCase(),
    }
}

// Utility function to match a node to each searchable field
const matchNode = (node, terms) => {
  const { name, fullNameNorm, description, parkCode, tr } = node;
  return name.includes(terms) || fullNameNorm.includes(terms) || description.includes(terms) || parkCode.includes(terms)|| tr.includes(terms);
}

// Utility function to match nodes based on search terms
const filterNodes = (nodes, terms) => {
    if(!terms || terms.length === 0) {
        return []
    }
    terms = terms.toLowerCase();
    return nodes.map(normalizeNode).filter((node) => matchNode(node, terms));
}

// Search component
const SearchPage = ({ data }) => {
  const [terms, setTerms] = useState(null);
  const handleSearch = (e) => setTerms(e.target.value);
  const nodes = data.allPark.nodes;
  const matches = filterNodes(nodes, terms);

  return (
    <Layout pageTitle="Search">
      <div className={searchStyles.searchBox}>
        <input type="search" name="q" minLength="2" maxLength="100" style={{width:"100%"}} onChange={handleSearch} placeholder="Enter your search terms..."></input>
      </div>
      <div>
        {terms && <p>{matches.length} results out of {nodes.length}</p>}
      </div>
      <ul>
        {matches.map((node) => {
          return (
              <li key={node.id}>
                  <Link to={"/parks/" + node.parkCode}>{node.fullName}</Link>
              </li>)
          })}
      </ul>
    </Layout>
  );
};

// Retrieve ALL parks data, grab markdown while we're at it
// Since it is a small number, we can do the search on the client-side
export const query = graphql`
  query {
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
          }
        }
      }
  }
`;

export default SearchPage;

export const Head = () => <title>Search Page</title>;
