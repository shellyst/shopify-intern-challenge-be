// Import important parts of Sequelize library.
const { Model, DataTypes } = require("sequelize");
// Import the database connection from config.js.
const sequelize = require("../config/connection");

// Initialize Produce model by extending off Sequelize's model class.
class Product extends Model {}

// Set up fields and rules for Product model.
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true,
      },
    },
    //   "References" property establishes the relationship between this product and the category it belongs to by referring to the Category model.
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "category",
        key: "id",
      },
    },
  },
  {
    //   Pass in our imported sequelize connection.
    sequelize,
    // Don't automatically create createdAt/updatedAt timestamp fields.
    timestamps: false,
    // Don't pluralize name of the database table.
    freezeTableName: true,
    // Use underscores instead of camel casing.
    underscored: true,
    // Make the model name stay lowercase in the database.
    modelName: "product",
  }
);

module.exports = Product;
