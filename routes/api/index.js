const router = require("express").Router();
const productRoutes = require("./product-routes");
const categoryRoutes = require("./category-routes");
const warehouseRoutes = require("./warehouse-routes");

router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/warehouses", warehouseRoutes);

module.exports = router;
