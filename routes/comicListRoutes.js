const router = require('express').Router()
const { ComicList, List, Comic } = require('../models')
const passport = require('passport')

// finds all comic lists
router.get('/comiclist', passport.authenticate('jwt'), (req, res) => {
  ComicList.findAll({
    include: [{ model: List }, { model: Comic }]
  })
    .then(comicLists => res.json(comicLists))
    .catch(err => console.log(err))
})

router.post('/comiclist', passport.authenticate('jwt'), (req, res) => ComicList.create({
  rating: req.body.rating,
  completion_status: req.body.completion_status,
  comic_id: req.body.comic_id,
  list_id: req.body.list_id
})
  .then(comiclist => res.json(comiclist))
  .catch(err => console.log(err)))

router.put('/comiclist/:id', passport.authenticate('jwt'), (req, res) => ComicList.update(req.body, { where: { id: req.params.id } })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

router.delete('/comiclist/:id', passport.authenticate('jwt'), (req, res) => ComicList.destroy({ where: { id: req.params.id } })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

module.exports = router
