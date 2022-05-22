const seedProducts = require("./product-seeds");
const seedCategories = require("./category-seeds");
const seedWarehouses = require("./warehouse-seeds");
const seedProductWarehouses = require("./product-warehouse-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");
  await seedCategories();
  console.log("\n----- CATEGORIES SEEDED -----\n");

  await seedProducts();
  console.log("\n----- PRODUCTS SEEDED -----\n");

  await seedWarehouses();
  console.log("\n----- WAREHOUSES SEEDED -----\n");

  await seedProductWarehouses();
  console.log("\n----- PRODUCT WAREHOUSES SEEDED -----\n");

  process.exit(0);
};

seedAll();
