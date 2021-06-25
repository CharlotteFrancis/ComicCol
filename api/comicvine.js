const axios = require('axios')
const router = require('express').Router()

let search = 'thor'

axios({
  method:"get",
  url: `https://comicvine.gamespot.com/api/search/?api_key=2981313d7d87c091040644d4cb8f4add51d0e6b1&format=json&sort=name:asc&resources=issue&query=${search}`,
  responseType: "json"
})
  .then(function (response) {
    const data = response.data.results
    // console.log(data)
    console.log(data[0].id)
    console.log('Name: ' + data[0].volume.name)
    console.log('Description: ' + data[0].description)
    console.log('Cover: ' + data[0].image.medium_url)
    console.log('Issue Number: ' + data[0].issue_number)
    console.log('Cover Date: ' + data[0].cover_date)
  })
  .catch(err => console.log(err))

module.exports = router

// let comicName = data[i].volume.name
// let comicDescription = data[i].description
// let coverImageMedium = data[i].image.medium_url
// let comicIssueNumber = data[i].issue_number
// let comicData = data[i].cover_date
