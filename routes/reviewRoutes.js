const router = require('express').Router()
const { Review } = require('../models')
const passport = require('passport')

router.get('/review', passport.authenticate('jwt'), (req, res) => {
  res.json(req.user.review)
})

router.post('/review', passport.authenticate('jwt'), (req, res) => Review.create({
  text: req.body.text,
  isDone: req.body.isDone,
  uid: req.user.id
})
  .then(review => res.json(review))
  .catch(err => console.log(err)))

router.put('/review/:id', passport.authenticate('jwt'), (req, res) => Review.update(req.body, { where: { id: req.params.id } })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

router.delete('/review/:id', passport.authenticate('jwt'), (req, res) => Review.destroy({ where: { id: req.params.id } })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

module.exports = router