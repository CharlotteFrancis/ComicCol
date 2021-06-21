const pls = require('passport-local-sequelize')
const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const User = pls.defineUser(sequelize, {
  // your columns here...
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  user_comment: DataTypes.STRING,
  user_list: DataTypes.ARRAY
})

module.exports = User
