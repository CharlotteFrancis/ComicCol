const router = require('express').Router()

router.use('/api', require('./userRoutes.js'))
router.use('/api', require('./commentRoutes.js'))
router.use('/api', require('./comicRoutes.js'))
// other routers go here...

module.exports = router
