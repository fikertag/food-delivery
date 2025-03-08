const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    deliveryPrice: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    items: [
      {
        itemId: {
          type: Schema.Types.ObjectId,
          ref: "item",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1, // Ensure at least 1 item is ordered
        },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "canceled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
