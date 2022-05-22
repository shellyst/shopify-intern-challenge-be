const Product = require("./Product");
const Category = require("./Category");
const Warehouse = require("./Warehouse");
const ProductWarehouse = require("./ProductWarehouse");

// Product belongsTo Category.
Product.belongsTo(Category, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

// Categories have many products.
Category.hasMany(Product, {
  foreignKey: "category_id",
});

// Products belongToMany Warehouses (through ProductWarehouse).
Product.belongsToMany(Warehouse, {
  through: ProductWarehouse,
  foreignKey: "product_id",
});

// Warehouses belongToMany Products (through ProductWarehouse).
Warehouse.belongsToMany(Product, {
  through: ProductWarehouse,
  foreignKey: "warehouse_id",
});

module.exports = { Product, Category, Warehouse, ProductWarehouse };
