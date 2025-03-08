const item = require("../models/itemsModule");
const catagory = require("../models/catagory");
const Comment = require("../models/comment");

// get all items
const getItems = async (req, res) => {
  try {
    const items = await item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//post items for admin
const postImage = async (req, res) => {
  const {
    name,
    price,
    discription,
    size,
    extraIngredientPrices,
    itemCatagory,
  } = req.body;

  const image = req.file.filename;

  if (!image) {
    return res.status(400).send("No image uploaded.");
  }

  const sizes = typeof size === "string" ? JSON.parse(size) : [];
  const extraIngredientPricess =
    typeof extraIngredientPrices === "string"
      ? JSON.parse(extraIngredientPrices)
      : [];

  try {
    const items = await item.create({
      name: name,
      price: price,
      discription: discription,
      image: image,
      size: sizes,
      extraIngredientPrices: extraIngredientPricess,
      itemCatagory: itemCatagory,
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//post comment for admin
const postComment = async (req, res) => {
  const { name, comment } = req.body;

  try {
    const response = await Comment.create({
      name: name,
      comment,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete items
const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const items = await item.findByIdAndDelete({ _id: id });
    if (!items) {
      return res.status(404).json({ error: "no such item" });
    }
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update
const updateItem = async (req, res) => {
  const {
    name,
    price,
    discription,
    size,
    extraIngredientPrices,
    // itemCatagory,
  } = req.body;
  const image = req.file?.filename;

  // if (!image) {
  //   return res.status(400).send("No image uploaded.");
  // }

  const sizes = typeof size === "string" ? JSON.parse(size) : [];
  const extraIngredientPricess =
    typeof extraIngredientPrices === "string"
      ? JSON.parse(extraIngredientPrices)
      : [];

  try {
    const { id } = req.params;
    const items = await item.findOneAndUpdate(
      { _id: id },
      {
        name: name,
        price: price,
        discription: discription,
        image: image,
        size: sizes,
        extraIngredientPrices: extraIngredientPricess,
      },
      { new: true }
    );
    if (!items) {
      return res.status(404).json({ error: "no such item" });
    }
    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

// post catagory for admin
const createCatagory = async (req, res) => {
  const { name } = req.body;
  try {
    const catagorys = await catagory.create({ name: name });
    res.status(200).json(catagorys);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all catagory
const getCatagory = async (req, res) => {
  try {
    const catagorys = await catagory.find();
    res.status(200).json(catagorys);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update catagory for admin
const updateCatagory = async (req, res) => {
  const { id } = req.params;
  try {
    const catagorys = await catagory.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!catagorys) {
      return res.status(404).json({ error: "no such item" });
    }
    res.status(200).json(catagorys);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// update catagory for admin
const deleteCatagory = async (req, res) => {
  const { id } = req.params;
  try {
    const catagorys = await catagory.findOneAndDelete({ _id: id }, req.body, {
      new: true,
    });
    if (!catagorys) {
      return res.status(404).json({ error: "no such item" });
    }
    res.status(200).json(catagorys);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getItems,
  postImage,
  deleteItem,
  updateItem,
  createCatagory,
  getCatagory,
  updateCatagory,
  deleteCatagory,
  postComment,
};
