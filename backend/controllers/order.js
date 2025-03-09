const Order = require("../models/order");
const item = require("../models/itemsModule"); // Changed to lowercase

// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId")
      .populate("items.itemId");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific order by ID
const getOrder = async (req, res) => {
  try {
    const order = await Order.find({ userId: req.params.id })
      .populate("userId")
      .populate("items.itemId");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new order
const createOrder = async (req, res) => {
  const { userId, items } = req.body;
  try {
    const itemsWithPrices = await Promise.all(
      items.map(async (i) => {
        const itemDetails = await item.findById(i.itemId); // Changed to lowercase
        if (!itemDetails) {
          throw new Error(`Item with id ${i.itemId} not found`);
        }
        return {
          ...i,
          price: itemDetails.price,
        };
      })
    );
    const subTotal = itemsWithPrices.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const deliveryPrice = subTotal * 0.005;
    const tax = subTotal * 0.01;
    const totalPrice = subTotal + deliveryPrice + tax;

    // Create a new order
    const order = new Order({
      userId,
      items: itemsWithPrices,
      subTotal,
      deliveryPrice,
      tax,
      totalPrice,
    });

    const newOrder = await order.save();
    // Populate the userId and items.itemId fields
    const populatedOrder = await Order.findById(newOrder._id)
      .populate("userId")
      .populate("items.itemId");

    res.status(201).json(populatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing order by ID
const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an order by ID
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
