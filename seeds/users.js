const { User } = require('../models')

const users = [
  {
    username: 'professorx',
    password: 'password1234'
  },
  {
    username: 'cyclops',
    password: 'password5678'
  },
  {
    username: 'iceman',
    password: 'password9012'
  }
]

const seedUsers = () => User.bulkCreate(users)

module.exports = seedUsers
