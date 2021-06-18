const router = require('express').Router()

router.use('/api', require('./userRoutes.js'))
// other routers go here...

module.exports = router
