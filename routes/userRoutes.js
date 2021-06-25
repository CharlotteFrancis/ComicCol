const router = require('express').Router()
const { User, List, Comment, Review } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

// get the current user's id
router.get('/users/getID', passport.authenticate('jwt'), (req, res) => {
  res.json(req.user.id)
})

// finds one user by their id, returns their associated list, comments, and reviews
router.get('/users/:id', (req, res) => {
  User.findOne({
    where: { id: req.params.id },
    include: [ { model: List }, { model: Comment }, { model: Review } ]
  })
  .then(user => res.json(user))
  .catch(err => console.log(err))
})

router.post('/users/register', (req, res) => {
  const { username, email } = req.body

  User.register(new User({ username, email }), req.body.password, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) { console.log(err) }
    res.json(user ? jwt.sign({ id: user.id }, process.env.SECRET) : null)
  })
})

module.exports = router
