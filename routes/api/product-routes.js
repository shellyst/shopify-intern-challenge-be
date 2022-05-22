const router = require("express").Router();
const {
  Product,
  Warehouse,
  Category,
  ProductWarehouse,
} = require("../../models");

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
router.get("/:id", (req, res) => {
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

// Creates a new product.
router.post("/", (req, res) => {
  Product.create({
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    category_id: req.body.category_id,
    warehouseIds: req.body.warehouseIds,
  })
    .then((product) => {
      //   If there are product warehouses, we need to create pairings to bulk create in the ProductWarehouse model.
      if (req.body.warehouseIds.length) {
        const productWarehouseIdArr = req.body.warehouseIds.map(
          (warehouse_id) => {
            return {
              product_id: product.id,
              warehouse_id,
            };
          }
        );
        return ProductWarehouse.bulkCreate(productWarehouseIdArr);
      }
      // If no product warehouses, just respond.
      res.status(200).json(product);
    })
    .then((productWarehouseIds) => res.status(200).json(productWarehouseIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Update product.
router.put("/:id", (req, res) => {
  // Update product data.
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      //   Find all associated warehouses from ProductWarehouse.
      return ProductWarehouse.findAll({ where: { product_id: req.params.id } });
    })
    .then((productWarehouses) => {
      //   Get list of current warehouse ids.
      const productWarehouseIds = productWarehouses.map(
        ({ warehouse_id }) => warehouse_id
      );
      //   Create filtered list of new warehouse_ids.
      const newProductWarehouses = req.body.warehouseIds
        .filter((warehouse_id) => !productWarehouseIds.includes(warehouse_id))
        .map((warehouse_id) => {
          return {
            product_id: req.params.id,
            warehouse_id,
          };
        });
      // Figure out which ones to remove.
      const productWarehouseToRemove = productWarehouses
        .filter(
          ({ warehouse_id }) => !req.body.warehouseIds.includes(warehouse_id)
        )
        .map(({ id }) => id);

      // Run both actions.
      return Promise.all([
        ProductWarehouse.destroy({ where: { id: productWarehouseToRemove } }),
        ProductWarehouse.bulkCreate(newProductWarehouses),
      ]);
    })
    .then((updatedProductWarehouses) => res.json(updatedProductWarehouses))
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Delete product.
router.delete("/:id", (req, res) => {
  // Delete one product by its `id` value.
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbProductData) => {
      if (!dbProductData) {
        res.status(404).json({ message: "No product found with this id." });
        return;
      }
      res.json(dbProductData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
