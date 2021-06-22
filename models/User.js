const pls = require('passport-local-sequelize')
const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const User = pls.defineUser(sequelize, {
  // your columns here...
  email: DataTypes.STRING
})

module.exports = User
