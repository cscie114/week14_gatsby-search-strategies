import React from 'react'
import { Link } from 'gatsby';
import algoliasearch from 'algoliasearch/lite'
import Layout from '../components/layout'
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  RefinementList,
} from 'react-instantsearch-hooks-web';
import 'instantsearch.css/themes/satellite.css';
import * as searchStyles from "./search.module.css"

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
)

const SearchAlgoliaPage = () => {

  return (
    <Layout pageTitle="Algolia Search">
      <InstantSearch
        indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
        searchClient={searchClient}>
        <SearchBox />
       {/*  
       <div className={searchStyles.refinementBox}>
          <RefinementList attribute="addresses.stateCode" 
                          showMore="true"
                          className={searchStyles.RefinementList}
                          searchable={true}
                          showMoreLimit={60}
                          />
          <RefinementList attribute="activities.name" 
                          showMore="true"
                          className={searchStyles.RefinementList}
                          searchable={true}
                          showMoreLimit={100}
                          />
        </div> 
        */}
        <Hits hitComponent={Hit} id="results"/>
      </InstantSearch>
    </Layout>
  )
}

function Hit({ hit }) {
  return (
    <article>
      <h4>
        <Link to={"/parks/"+hit.parkCode}><Highlight attribute="fullName" hit={hit} /></Link>
      </h4>
      <p><Highlight attribute="description" hit={hit} /></p>
    </article>
  );
}

export default SearchAlgoliaPage;