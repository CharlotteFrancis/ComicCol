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

// find one comiclist object where user_id and comic_id are equal to param.id
router.get('/comiclist/:comic_id/:user_id', passport.authenticate('jwt'), (req, res) => {
  ComicList.findOne({
    where: {
      comic_id: req.params.comic_id,
      user_id: req.params.user_id
    }
  })
  .then(comicLists => res.json(comicLists))
  .catch(err => console.log(err))
})

// get one comiclist by id
router.get('comiclist/:id', passport.authenticate('jwt'), (req, res) => {
  ComicList.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(comiclist => res.json(comiclist))
    .catch(err => res.status(400).json(err))
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
