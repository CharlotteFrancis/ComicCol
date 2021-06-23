const router = require('express').Router()
const { Comic } = require('../models')
const passport = require('passport')

router.get('/comic', passport.authenticate('jwt'), (req, res) => {
  res.json(req.user.comic)
})

router.post('/comic', passport.authenticate('jwt'), (req, res) => Comic.create({
  text: req.body.text,
  isDone: req.body.isDone,
  uid: req.user.id
})
  .then(comic => res.json(comic))
  .catch(err => console.log(err)))

router.put('/comic/:id', passport.authenticate('jwt'), (req, res) => Comic.update(req.body, { where: { id: req.params.id } })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

router.delete('/comic/:id', passport.authenticate('jwt'), (req, res) => Comic.destroy({ where: { id: req.params.id } })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

module.exports = router