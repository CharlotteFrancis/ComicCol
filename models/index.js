const User = require('./User.js')
const Comic = require('./Comic.js')
const ComicList = require('./ComicList.js')
const List = require('./List.js')
const Comment = require('./Comment.js')

// your relationships go here...

// a user has many comments
// MIGHT NEED TO ADD ONDELETE: 'CASCADE'
User.hasMany(Comment, {
  foreignKey: 'user_id'
})

// a comment belongs to a single user
Comment.belongsTo(User, {
  foreignKey: 'user_id'
})

// a user has one list
User.hasOne(List, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

// a list belongs to one user
List.belongsTo(User, {
  foreignKey: 'user_id'
})

// a comic belongs to one list
Comic.belongsTo(List, {
  foreignKey: 'list_id'
})

// a list has many comics
List.hasMany(Comic, {
  foreignKey: 'list_id',
  onDelete: 'CASCADE'
})

// // a comic belongs to many lists
// Comic.belongsToMany(List, {
//   through: ComicList,
//   foreignKey: 'comic_id',
//   otherKey: 'list_id'
// })

// // a list has many comics, we use belongsToMany here because of the many to many association
// List.belongsToMany(Comic, {
//   through: ComicList,
//   foreignKey: 'list_id',
//   otherKey: 'comic_id'
// })

module.exports = { User, Comic, ComicList, List, Comment }
