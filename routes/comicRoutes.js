const router = require('express').Router()
const { Comic, List, ComicList } = require('../models')
const passport = require('passport')

// gets the current user's list of comics
router.get('/comic', passport.authenticate('jwt'), (req, res) => {
  res.json(req.user.list)
})

// gets a comic by its image url
router.get('/comic/:url', passport.authenticate('jwt'), (req, res) => {
  Comic.findOne({
    where: { cover_image: req.params.url }
  })
  .then(comic => res.json(comic))
  .catch(err => res.status(400).json(err))
})

// creates a new comic
router.post('/comic', passport.authenticate('jwt'), (req, res) => Comic.create(req.body)
  .then(comic => res.json(comic))
  .catch(err => console.log(err)))

router.put('/comic/:id', passport.authenticate('jwt'), (req, res) => Comic.update(req.body, { where: { id: req.params.id } })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

router.delete('/comic/:id', passport.authenticate('jwt'), (req, res) => Comic.destroy({ where: { id: req.params.id } })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

module.exports = router