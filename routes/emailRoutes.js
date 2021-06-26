const router = require('express').Router()
const sendmail = require('sendmail')()

// used for the sendmail npm module
router.post('/email', (req, res) => {
  sendmail(req.body)
})

module.exports = router