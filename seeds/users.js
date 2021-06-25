const { User } = require('../models')

const users = [
  {
    username: 'professorx',
    email: 'profx@email.com',
    password: 'password1234'
  },
  {
    username: 'cyclops',
    email: 'ole1eye@email.com',
    password: 'password5678'
  },
  {
    username: 'iceman',
    emai: 'coolkid@email.com',
    password: 'password9012'
  }
]

const seedUsers = () => User.bulkCreate(users)

module.exports = seedUsers
