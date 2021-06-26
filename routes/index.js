const router = require('express').Router()

router.use('/api', require('./userRoutes.js'))
router.use('/api', require('./commentRoutes.js'))
router.use('/api', require('./comicRoutes.js'))
router.use('/api', require('./comicVineRoutes.js'))
router.use('/api', require('./reviewRoutes.js'))
router.use('/api', require('./comicListRoutes.js'))
router.use('/api', require('./listRoutes.js'))
router.use('/api', require('./emailRoutes.js'))
// other routers go here...

module.exports = router
