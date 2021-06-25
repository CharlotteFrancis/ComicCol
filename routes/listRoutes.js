const router = require('express').Router()
const { List, User, ComicList, Comic } = require('../models')
const passport = require('passport')

// gets the current user's list
router.get('/lists', passport.authenticate('jwt'), (req, res) => {
  // res.json(req.user.list)
  List.findOne({
    where: {
      id: req.user.id
    },
    include: [
      { model: Comic }
    ]
  })
    .then(idlist => res.json(idlist))
    .catch(err => res.status(400).json(err))
})

// get list by id
router.get('/lists/:id', (req, res) => {
  List.findOne({
    where: {
      id: req.params.id
    },
    include: [
      { model: Comic }
    ]
  })
    .then(idlist => res.json(idlist))
    .catch(err => res.status(400).json(err))
})

// creates a list for the current user
router.post('/lists', passport.authenticate('jwt'), (req, res) => {
  /* req.body looks like this:
     comicIds: [1, 2, 3, 4]
   */
  List.create({
    user_id: req.user.id
  })
    .then(post => res.json(post))
    .catch(err => console.log(err))
  // List.create(req.body)
  // .then(list => {
  //   if (req.body.comicIds.length) {
  //     const listTagIdArr = req.body.comicIds.map(comic_id => {
  //       return { list_id: list.id, comic_id }
  //     })
  //     return ComicList.bulkCreate(listTagIdArr)
  //   }
  //   res.sendStatus(200).json(list)
  // })
  // .then(comicListIds => res.status(200).json(comicListIds))
  // .catch(err => res.sendStatus(400).json(err))
})

// updates the list with the specified id
router.put('/lists/:id', passport.authenticate('jwt'), (req, res) => {
  List.update(req.body, { where: { id: req.params.id } })
  .then(list => res.json(list))
  .catch(err => console.log(err))

  // List.update(req.body, { where: { id: req.params.id } })
  // .then(list => {
  //   return ComicList.findAll({ where: { list_id: req.params.id } })
  // })
  // .then(comicLists => {
  //   const comicListIds = comicLists.map(({ comic_id }) => comic_id)
  //   const newComicLists = req.body.comicIds
  //     .filter(comic_id => !comicListIds.includes(comic_id))
  //     .map(comic_id => {
  //       return { list_id: req.params.id, comic_id }
  //     })

  //   const comicListsToRemove = comicLists
  //     .filter(({ comic_id }) => !req.body.comicIds.includes(comic_id))
  //     .map(({ id }) => id)
    
  //   return Promise.all([
  //     Promise.destroy({ where: { id: comicListsToRemove} }),
  //     Promise.bulkCreate(newComicLists)
  //   ])
  // })
  // .then(updatedComicLists => res.json(updatedComicLists))
  // .catch(err => res.status(400).json(err))
})

// deletes a list with the specified id
router.delete('/lists/:id', passport.authenticate('jwt'), (req, res) => {
  List.destroy({ where: { id: req.params.id } })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err))
})

module.exports = router