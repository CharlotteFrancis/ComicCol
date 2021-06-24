const router = require('express').Router()
const { Comment, User, Review } = require('../models')
const passport = require('passport')

// gets the current user's comments
router.get('/comment', passport.authenticate('jwt'), (req, res) => {
  res.json(req.user.comment)
})

// get a comment by its id
router.get('/comment/:id', passport.authenticate('jwt'), (req, res) => {
  Comment.findOne({
    where: { id: req.params.id },
    include: [ {model: User}, {model: Review} ]
  })
  .then(comment => res.json(comment))
  .catch(err => console.log(err))
})

router.post('/comment', passport.authenticate('jwt'), (req, res) => Comment.create({
  text: req.body.text,
  uid: req.user.id
})
  .then(comment => res.json(comment))
  .catch(err => console.log(err)))

router.put('/comment/:id', passport.authenticate('jwt'), (req, res) => Comment.update(req.body, { where: { id: req.params.id } })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

router.delete('/comment/:id', passport.authenticate('jwt'), (req, res) => Comment.destroy({ where: { id: req.params.id } })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

module.exports = router
