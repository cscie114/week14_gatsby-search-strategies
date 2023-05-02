## Gatsby Search Examples
This Gatsby project uses the NPS.gov API and local Markdown files (trip_reports) to provide an example application for Harvard Extension School CSCI E114 Web Application Development with Jamstack.

You will need an NPS.gov API key, to be set in an .env file as `NPS_API_KEY=[your key here]`

There are three search examples in this repo:
### Local (plain Javascript) search
In pages/search-local.js, or at [http://localhost:8000/search-local/](http://localhost:8000/search-local/)

### js-search npm package
In pages/search-js.js. or at [http://localhost:8000/search-js/](http://localhost:8000/search-js/)

### Algolia search
In pages/search-algolia.js, or at [http://localhost:8000/search-js/](http://localhost:8000/search-js/)

Algolia search will require an algolia account, and an app set up on Algola Dashboard. You will need to add these values to your .env and a .env.production (for the build step). Note that the `GATSBY_` prefix is required for .env variables which need to be accessed by the React/Gatsby client code. Variables without this prefix are not available in the client.

```
NPS_API_KEY=[your key here]
GATSBY_ALGOLIA_SEARCH_KEY=[your key here] //this is the public search key for the client
GATSBY_ALGOLIA_APP_ID=[your key here]     // this code is proviced by Algolia Dashboard for your app
ALGOLIA_API_KEY=[your key here]           // this is the admin key, kept server-side for building the index
GATSBY_ALGOLIA_INDEX_NAME=Parks           // this is the index name we've provided for this application
```
#### Algolia App Configuration
For the faceted search to work, you will have to either:
- In `algolia-queries.js`, add the commented configuration properties to the `settings` object. This should set up the facet configuration (though this is not how it was done for the in-class example and is untested)
__OR__
- In Algolia Dashboard UI for your app, configure the *Facets->Attributes for faceting* to include `activities.name` and `addresses.stateCode`, `searchable` (if you like), and `maxFacetHits=100`. Then add both these propreties to *Facet Display* as well with your desired sort order.

#### Algolia Index Creation
You must `gatsby build` your project at least once to send the data to the Algolia index. Once done, you will be able to `gatsby develop` as usual to access the Algolia service. 
 