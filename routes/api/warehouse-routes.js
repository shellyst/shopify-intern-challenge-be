const router = require("express").Router();
const { Warehouse, Product, ProductWarehouse } = require("../../models");

// The `api/warehouses` endpoint.
router.get("/", (req, res) => {
  // Find all warehouses.
  // Be sure to include its associated Product data.
  Warehouse.findAll({
    attributes: ["id", "warehouse_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((warehouse) => res.json(warehouse))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get warehouse by id.
router.get("/:id", (req, res) => {
  // Find a single warehouse by its id.
  // Be sure to include its associated Product data.
  Warehouse.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ["product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((warehouse) => {
      if (!warehouse) {
        res.status(400).json({ message: "No warehouse found with this id." });
        return;
      }
      res.json(warehouse);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // Create a new warehouse.
  Warehouse.create({
    warehouse_name: req.body.warehouse_name,
  })
    .then((warehouse) => {
      res.json(warehouse);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update warehouse by its `id` value.
router.put("/:id", (req, res) => {
  Warehouse.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((warehouse) => {
      if (!warehouse[0]) {
        res.status(404).json({ message: "No warehouse found with this id." });
        return;
      }
      res.json(warehouse);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete a warehouse by its id.
router.delete("/:id", (req, res) => {
  Warehouse.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((warehouse) => {
      if (!warehouse) {
        res.status(404).json({ message: "No tag found with this id." });
        return;
      }
      res.json(warehouse);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
