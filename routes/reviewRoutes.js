const router = require('express').Router()
const { Review } = require('../models')
const passport = require('passport')

// gets the current user's reviews
router.get('/review', passport.authenticate('jwt'), (req, res) => {
  res.json(req.user.review)
})

router.post('/review', passport.authenticate('jwt'), (req, res) => Review.create({
  text: req.body.text,
  user_id: req.user.id,
  comic_id: req.body.comic_id
})
  .then(review => res.json(review))
  .catch(err => console.log(err)))

router.put('/review/:id', passport.authenticate('jwt'), (req, res) => Review.update(req.body, { where: { id: req.params.id } })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

router.delete('/review/:id', passport.authenticate('jwt'), (req, res) => Review.destroy({ where: { id: req.params.id } })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

// get all reviews on a single comic
router.get('/reviews', (req, res) => {
  Review.findAll({ where: { id: Comic.id}})
  .then(results => {
    res.json(reviews)
  })
})

module.exports = router