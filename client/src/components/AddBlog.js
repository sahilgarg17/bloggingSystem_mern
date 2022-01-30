import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import BlogContext from "../context/BlogContext";
import { useState, useContext } from "react";
const AddBlog = () => {
  const [blog, setblog] = useState({
    title: "",
    description: "",
  });

  const context = useContext(BlogContext);

  const { addBlog } = context;

  const onchange = (e) => {
    setblog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();

    addBlog(blog.title, blog.description);

    setblog({ title: "", description: "" });
  };

  return (
    <>
      <Container maxWidth="sm">
        <h1>Title</h1>

        <Box
          sx={{
            width: 700,
            maxWidth: "100%",
          }}
        >
          <TextField
            fullWidth
            label="Blog Title"
            value={blog.title}
            name="title"
            onChange={onchange}
            id="fullWidth"
          />

          <h1>Blog Description</h1>

          <TextField
            id="filled-multiline-flexible"
            sx={{
              mt: 1,
            }}
            label="Blog Content"
            multiline
            fullWidth
            name="description"
            value={blog.description}
            onChange={onchange}
            variant="outlined"
            rows={5}
          />
        </Box>

        <Button variant="outlined" onClick={handleClick} sx={{ mt: 2 }}>
          POST
        </Button>
      </Container>
    </>
  );
};

export default AddBlog;
