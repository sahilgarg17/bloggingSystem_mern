const express = require("express");

const router = express.Router();

const Blog = require("../models/Blogs");

const fetchuser = require("../middlewares/fetchuser");

// add a blog

router.post("/addblog", fetchuser, async (req, res) => {
  try {
    const { title, description } = req.body;

    const newBlog = new Blog({
      title,
      description,
      user: req.user.id,
    });

    const data = await newBlog.save();

    res.status(201).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

// fetch all blogs

router.get("/fetchallblogs", fetchuser, async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.user.id });

    res.status(200).send(blogs);
  } catch (error) {
    res.status(500).send(error);
  }
});

// update  blogs

router.put("/updateblog/:id", fetchuser, async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, description } = req.body;

    let blogs = await Blog.findById(blogId);

    if (!blogs) {
      res.status(400).send("user not found");
    }

    const updateBlog = {};

    if (title) {
      updateBlog.title = title;
    }

    if (description) {
      updateBlog.description = description;
    }

    if (blogs.user.toString() !== req.user.id) {
      res.status(400).send("Not allowed");
    }

    blogs = await Blog.findByIdAndUpdate(
      blogId,
      { $set: updateBlog },
      { new: true }
    );

    res.status(200).send(blogs);
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete a blog

router.delete("/deleteblog/:id", fetchuser, async (req, res) => {
  try {
    const existBlog = await Blog.findById(req.params.id);

    if (!existBlog) {
      res.send("not found");
    }

    if (existBlog.id.toString() !== req.user.id) {
      res.send("not allowed");
    }

    const blog = await Blog.findByIdAndDelete(req.params.id);

    res.status(200).send(blog);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
