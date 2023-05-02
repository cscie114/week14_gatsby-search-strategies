require("dotenv").config();
const EleventyFetch = require("@11ty/eleventy-fetch");

let count=0;
/*
  Here we'll use the Gatsby sourceNodes API.
  Inside that, call createNode for each data element
  in this case, from getParks()
*/

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
}) => {
  const { createNode } = actions

  const parksData = await getParks();

  // loop through data and create Gatsby nodes
  parksData.data.forEach(park =>
    createNode({
      ...park,
      id: createNodeId(park.parkCode),
      parent: null,
      children: [],
      internal: {
        type: "Park",
        contentDigest: createContentDigest(park),
      },
    })
  )
  return

}



/*    getParks - uses NPS API to retreive all parks data
*/
async function getParks(){
  const npsEndpointParks = "https://developer.nps.gov/api/v1/parks";
  const npsEndpointPlaces = "https://developer.nps.gov/api/v1/places";
  const PARK_NODE_TYPE = `Park`;
  
  /* limit of 100 items to play nice with 1,000 req per hour rate limit 
      cache response data for 1d for all requests
  */
  const limit = 100;
  const cacheDuration = '1d';
  /* get {limit} at a time, starting at 0 */
  let start = 0;

  let params = {
    start: start,
    limit: limit,
  };
  let reqHeaders = getNpsHeaders();

  let totalParks;
  let nextStart;
  let allParksData = { data: []};
  let url;

  do {
    try {
      let paramsObj = new URLSearchParams(params);
      url = `${npsEndpointParks}?${paramsObj.toString()}`
      console.log(`Parks URL: ${url}`);
      let parksData = await EleventyFetch(url, {
        fetchOptions: {
          headers: reqHeaders
        },
        duration: cacheDuration,
        type: "json",
        directory: ".11tycache"
      });
        
      /* push data from this request onto array
        where we are collecting things - allParksData.data */
      allParksData.data.push(...parksData.data);
      allParksData.total = parksData.total;
      
      /* update for next request so we can see
        if we need to "do" it, and if we do it,
        values are all set */
      totalParks = parksData.total;
      lastStart = params.start;
      nextStart = lastStart + params.limit;
      params.start = nextStart;

      /* output progress to console */
      console.log(`Parks requests:  start ${lastStart} | next ${nextStart} | total ${totalParks} | retrieved ${allParksData.data.length}`);

    } catch (err) {
      console.log(`Something is wrong with "parks" request to ${url} |  ${err}`);
    }
    
  } while (nextStart <= totalParks);
  return allParksData;
}

function getNpsHeaders() {
  const apiKey = process.env.NPS_API_KEY;
  const userAgentString =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36";
    /* request Headers, including
     for API authentication */
  const reqHeaders = {
    "User-Agent": userAgentString,
    "X-Api-Key": apiKey
  };
  return(reqHeaders)
}