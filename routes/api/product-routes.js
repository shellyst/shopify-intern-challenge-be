const router = require("express").Router();
const { Warehouse, Category } = require("../../models");
const { Product } = require("../../models/Category");

// Gets all product routes.
router.get("/", (req, res) => {
  // Includes Product and Warehouse.
  Product.findAll({
    attributes: ["id", "product_name", "price", "stock", "category_id"],
    include: [
      {
        model: Category,
        attributes: ["id", "category_name"],
      },
      {
        model: Warehouse,
        attributes: ["warehouse_name"],
      },
    ],
  })
    .then((productData) => res.json(productData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Return a single product by id.
router.get(":/id", (req, res) => {
  // Includes associated Product and Warehouse.
  Product.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Category,
        attributes: ["id", "category_name"],
      },
      {
        model: Warehouse,
        attributes: ["warehouse_name"],
      },
    ],
  })
    .then((productData) => {
      if (!productData) {
        res.status(404).json({ message: "No product found with that id." });
        return;
      }
      res.json(productData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
