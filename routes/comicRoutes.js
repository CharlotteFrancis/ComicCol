const router = require('express').Router()
const { Comic, Review } = require('../models')
const passport = require('passport')

// returns the current user's list of comics
router.get('/comic', passport.authenticate('jwt'), (req, res) => {
  res.json(req.user.list)
})

// get comic by id - NOT CONFIRMED NEED COVER_IMAGE ROUTE TO SEE IF IT EXISTS IN OUR DATABASE
router.get('/comic/:id', (req, res) => {
  Comic.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Review
      }
    ]
  })
    .then(comic => res.json(comic))
    .catch(err => res.status(400).json(err))
})

// see if comic is in our database route
router.get('/comic/exists/:title/:issue/:name', (req, res) => {
  Comic.findOne({
    where: {
      name: req.params.title,
      issue_number: req.params.issue,
      issue_name: req.params.name
    }
  })
    .then((comi) => {
      res.json(comi.id)
    })
    .catch(err => {
      res.status(400).json(err)
    })
})

router.post('/comic', passport.authenticate('jwt'), (req, res) => Comic.create({
  name: req.body.name,
  description: req.body.description,
  cover_image: req.body.cover_image,
  issue_number: req.body.issue_number,
  issue_name: req.body.issue_name,
  cover_date: req.body.cover_date,
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
