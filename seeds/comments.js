const { Comment } = require('../models')

const comments = [
  {
    text: 'This is my favorite!'
  },
  {
    text: 'Love this comic'
  },
  {
    text: 'this one stunk but the cover is cool'
  }
]

const seedComments = () => Comment.bulkCreate(comments)

module.exports = seedComments
