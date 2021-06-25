const User = require('./User.js')
const Comic = require('./Comic.js')
const ComicList = require('./ComicList.js')
const List = require('./List.js')
const Comment = require('./Comment.js')
const Review = require('./Review.js')

// your relationships go here...

//a user has many reviews
User.hasMany(Review, {
  foreignKey: 'user_id'
})

//a review has one user
Review.belongsTo(User, {
  foreignKey: 'user_id'
})

// a review has many comments
Review.hasMany(Comment, {
  foreignKey: 'comment_id'
})

// a comment belongs to a single review
Comment.belongsTo(Review, {
  foreignKey: 'review_id'
})

// a user has many comments
User.hasMany(Comment, {
  foreignKey: 'user_id'
})

// a comment belongs to a single user
Comment.belongsTo(User, {
  foreignKey: 'user_id'
})

// a user has one list
User.hasOne(List, {
  foreignKey: 'user_id'
})

// a list belongs to one user
List.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

// a comic belongs to many lists
Comic.belongsToMany(List, {
  through: ComicList,
  foreignKey: 'comic_id',
  otherKey: 'list_id'
})

// a list has many comics, we use belongsToMany here because of the many to many association
List.belongsToMany(Comic, {
  through: ComicList,
  foreignKey: 'list_id',
  otherKey: 'comic_id'
})

Comic.hasMany(Review, {
  foreignKey: 'comic_id'
})

Review.belongsTo(Comic, {
  foreignKey: 'comic_id'
})

module.exports = { User, Comic, ComicList, List, Comment, Review }
