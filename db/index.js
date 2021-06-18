const { Sequelize } = require('sequelize')

module.exports = new Sequelize(process.env.JAWSDB_URL || process.env.LOCAL_URL)
