'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Trip.belongsTo(models.Traveller, {
        foreignKey:'traveller_id'
      });

      Trip.belongsToMany(models.Hotel, {
        through:models.Trip_Hotel,
        foreignKey:'trip_id',
        otherKey:'hotel_id'
      })
    }
  }
  Trip.init({
    destination: DataTypes.STRING,
    startDate:DataTypes.DATE,
    endDate:DataTypes.DATE,
    traveller_id:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Trip',
    tableName:'Trip'
  });
  return Trip;
};