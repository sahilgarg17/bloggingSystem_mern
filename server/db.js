const mongoose = require("mongoose");
const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log("some thing went wrong", err);
  });
