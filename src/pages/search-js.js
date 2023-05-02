import React, { useState, useEffect } from 'react'
import { Link, graphql } from 'gatsby';
import * as JsSearch from 'js-search'
import Layout from '../components/layout'

const JsSearchPage = ({data}) => {
    const [parkList, setParkList] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [search, setSearch] = useState([])
    
    // useEffect to initialize JsSearch, set state for initial conditions without triggering rerendering
    useEffect(() => {
        const parks = data.allPark.nodes;
        setParkList(parks)
    
        // initialize the JsSearch object
        const dataToSearch = new JsSearch.Search("parkCode")
        // set to "startsWith" strategy
        dataToSearch.indexStrategy = new JsSearch.PrefixIndexStrategy()
        // normalize to lowercase
        dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer()
        // choose TF-IDF weighting
        dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex("parkCode")
    
        // set search fields to index
        dataToSearch.addIndex("fullName") 
        dataToSearch.addIndex("description") 
        // this syntax is for neste properties 'images.title' and 'images.caption'
        dataToSearch.addIndex(["images", "title"]) 
        dataToSearch.addIndex(["images", "caption"]) 
    
        // add the dataset
        dataToSearch.addDocuments(parkList) 
        // set initial state for UI
        setSearch(dataToSearch)
    }, [parkList.length, parkList, search.length, data.allPark.nodes]);

    // called onChange of input field
    const searchData = e => {
      const queryResult = search.search(e.target.value) 
      setSearchQuery(e.target.value)
      setSearchResults(queryResult)
    }
    
    // prevents form from submitting
    const handleSubmit = e => {
      e.preventDefault()
    }
    
    // if the query is empty, display evertything
    const queryResults = searchQuery === "" ? parkList : searchResults

    return (        
        <Layout pageTitle="js-search page">
            <div style={{ margin: "0 auto" }}>
                <form onSubmit={ handleSubmit }>
                    <div style={{ margin: "0 auto" }}>
                        <label htmlFor="Search" style={{ paddingRight: "10px" }}>
                            Enter your search here
                        </label>
                        <input
                            id="Search"
                            value={searchQuery}
                            onChange={searchData}
                            placeholder="Enter your search here"
                            style={{ margin: "0 auto", width: "400px" }}
                        />
                    </div>
                </form>
                <div>
                Number of items:
                    {queryResults.length}
                    <ul>
                        {queryResults.map((node) => {
                        return (
                            <li key={node.id}>
                                <Link to={"/parks/" + node.parkCode}>{node.fullName}</Link>
                            </li>)
                        })}
                    </ul>
                </div>

            </div>
        </Layout>
    )
}
export default JsSearchPage;
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