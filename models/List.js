const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class List extends Model { }

List.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'list'
  }
)

module.exports = List