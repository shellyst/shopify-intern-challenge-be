const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

class Warehouse extends Model {}

Warehouse.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    warehouse_name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "warehouse",
  }
);

module.exports = Warehouse;
