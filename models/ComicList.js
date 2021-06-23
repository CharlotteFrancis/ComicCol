const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class ComicList extends Model { }

ComicList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    completion_status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comic_list'
  }
)

module.exports = ComicList