const { ProductWarehouse } = require("../models");

const productWarehouseData = [
  {
    product_id: 1,
    warehouse_id: 1,
  },
  {
    product_id: 2,
    warehouse_id: 2,
  },
  {
    product_id: 3,
    warehouse_id: 4,
  },
  {
    product_id: 4,
    warehouse_id: 3,
  },
];

const seedProductWarehouses = () =>
  ProductWarehouse.bulkCreate(productWarehouseData);

module.exports = seedProductWarehouses;
