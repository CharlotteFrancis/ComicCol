require('dotenv').config()

const seedUsers = require('./users.js')
const seedComics = require('./comics.js')
const sequelize = require('../db')
const seedComments = require('./comments.js')

async function seedAll() {
  await sequelize.sync({ force: true })
  await seedUsers()
  await seedComics()
  await seedComments()
  process.exit()
}

seedAll()
