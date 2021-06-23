const router = require('express').Router()
const { ComicList } = require('../models')
const passport = require('passport')

router.get('/comiclist', passport.authenticate('jwt'), (req, res) => {
  res.json(req.user.comic_list)
})

router.post('/comiclist', passport.authenticate('jwt'), (req, res) => ComicList.create({
  rating: req.body.rating,
  completion_status: req.body.completion_status,
  uid: req.user.id
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
