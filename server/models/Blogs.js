const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,

    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const blog = mongoose.model("Blogs", blogSchema);

module.exports = blog;
