const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const extraPriceSchema = new Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
});

const itemsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    discription: {
      type: String,
    },
    size: {
      type: [extraPriceSchema],
    },
    extraIngredientPrices: {
      type: [extraPriceSchema],
    },
    itemCatagory: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("item", itemsSchema);
