const router = require('express').Router()
const axios = require('axios')
require('dotenv').config()

router.get('/comicVine/:query', (req, res) => {
  console.log(req.params.query)
  console.log('hello world')
  axios({
    method: 'get',
    url: `https://comicvine.gamespot.com/api/search/?api_key=${process.env.API_KEY}&format=json&limit=18&sort=name:asc&resources=issue&query=${req.params.query}`,
    responseType: 'json'
  })
    .then(comics => res.json(comics.data.results))
    .catch(err => console.log(err))
})

module.exports = router
