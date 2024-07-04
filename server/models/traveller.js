'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Traveller extends Model {

    static associate(models) {
      Traveller.hasMany(models.Trip, {
        foreignKey:"traveller_id"
      })
    }
  }
  Traveller.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Traveller',
    tableName:'Traveller'
  });
  return Traveller;
};