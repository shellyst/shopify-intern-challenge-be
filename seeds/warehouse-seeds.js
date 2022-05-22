const { Warehouse } = require("../models");

const warehouseData = [
  {
    warehouse_name: "Chicago Warehouse",
  },
  {
    warehouse_name: "Toronto Warehouse",
  },
  {
    warehouse_name: "London Warehouse",
  },
  {
    warehouse_name: "Montreal Warehouse",
  },
  {
    warehouse_name: "New York Warehouse",
  },
];

const seedWarehouses = () => Warehouse.bulkCreate(warehouseData);
module.exports = seedWarehouses;
