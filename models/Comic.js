const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Comic extends Model { }

Comic.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cover_image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    issue_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    issue_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cover_date: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comic'
  }
)

module.exports = Comic
