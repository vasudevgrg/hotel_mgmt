'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.belongsTo(models.Hotel, {
        foreignKey:"hotel_id"
      })
    }
  }
  Room.init({
    roonno: DataTypes.INTEGER,
    size: DataTypes.STRING,
    price: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    hotel_id:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Room',
    tableName:'Room'
  });
  return Room;
};