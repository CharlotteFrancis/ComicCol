const axios = require('axios')
const router = require('express').Router()

axios({
  method:"get",
  url: `https://comicvine.gamespot.com/api/search/?api_key=2981313d7d87c091040644d4cb8f4add51d0e6b1&format=json&sort=name:asc&resources=issue&query=wolverine`,
  responseType: "json"
})
  .then(function (response) {
    const data = response.data.results
    console.log(data)
  })
  .catch(err => console.log(err))

module.exports = router

