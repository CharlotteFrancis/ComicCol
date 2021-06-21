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