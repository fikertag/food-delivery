const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// controller
const {
  getItems,
  postImage,
  deleteItem,
  updateItem,
  createCatagory,
  getCatagory,
  updateCatagory,
  deleteCatagory,
  postComment,
} = require("../controllers/item");

// get all items
router.get("/", getItems);

// post item
router.post("/", upload.single("image"), postImage);

// post comment
router.post("/comment", postComment);

// delete item
router.delete("/:id", deleteItem);

// update item
router.patch("/:id", upload.single("image"), updateItem);

// create catagory
router.post("/catagory", createCatagory);

// get catagory
router.get("/catagory", getCatagory);

// update catagory
router.patch("/catagory/:id", updateCatagory);

// update catagory
router.delete("/catagory/:id", deleteCatagory);

module.exports = router;
