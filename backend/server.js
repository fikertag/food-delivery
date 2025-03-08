require("dotenv").config();
const cors = require("cors");

//express app
const express = require("express");
const app = express();

// router
const itemRrouter = require("./routes/items");
const userRouter = require("./routes/user");
const orderRouter = require("./routes/order");

// model
const mongoose = require("mongoose");

// middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/items", itemRrouter);
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);

// connect to db and listin

mongoose
  .connect(process.env.MONGOOSE_CONNECTION)
  .then(() => {
    app.listen(5000, console.log("server listining on port 5000 ..."));
  })
  .catch((error) => {
    console.log(error);
  });
