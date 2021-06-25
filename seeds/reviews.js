const { Review } = require('../models')

const reviews = [
  {
    text: "Favorite comic cover by far"
  },
  {
    text: "Ho-Ho-Homicide - mcu's really missing out here"
  }
]

const seedReviews = () => Review.bulkCreate(reviews)

module.exports = seedReviews