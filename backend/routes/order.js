const express = require("express");
const router = express.Router();

// Controller functions
const {
  getOrders,
  getOrder,
  deleteOrder,
  createOrder,
  updateOrder,
} = require("../controllers/order");

// Get all orders
router.get("/", getOrders);

// Get a single order by ID
router.get("/:id", getOrder);

// Create a new order
router.post("/", createOrder);

// Update an order (partial update)
router.patch("/:id", updateOrder);

// Delete an order
router.delete("/:id", deleteOrder);

module.exports = router;
