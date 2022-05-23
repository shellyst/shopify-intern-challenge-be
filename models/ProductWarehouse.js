const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class ProductWarehouse extends Model {}

ProductWarehouse.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "product",
        key: "id",
      },
    },

    warehouse_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "warehouse",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: "product_warehouse",
  }
);

module.exports = ProductWarehouse;
