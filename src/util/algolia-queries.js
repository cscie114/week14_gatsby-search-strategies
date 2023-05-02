
// define the graphql query which algolia will use to pull search data
const query = `
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
          activities {
            name
          }
          addresses {
            stateCode
          }
        }
      }
  }
`
// must provide an 'objectID' property to algolia. here we map node.id to objectID
function pageToAlgoliaRecord(node) {
    return {
      objectID: node.id,
      ...node
    }
  }
  
  // queries array is referenced in gatsby-config.js algolia plugin config
  const queries = [
    {
      query: query,
      transformer: ({ data }) => data.allPark.nodes.map(pageToAlgoliaRecord),
      indexName: 'Parks',
      settings: { attributesToSnippet: [`description:20`] },
    }
  ]

module.exports = queries
