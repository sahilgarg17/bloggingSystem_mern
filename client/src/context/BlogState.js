import BlogContext from "./BlogContext";

import React, { useState } from "react";

const BlogState = (props) => {
  const host = "http://localhost:3001";
  const checked = {
    title: "Software Developer",
    description:
      "We are software developers. Our work is to  build new softwares",
  };

  const blogsIntitialState = [];

  const [blogs, setblogs] = useState(blogsIntitialState);
  // fetching blogs from database
  const getBlogs = async () => {
    const response = await fetch(`${host}/api/blog/fetchallblogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();
    // console.log(json );
    setblogs(json);
  };

  // add a blog

  const addBlog = async (title, description) => {
    const data = {
      title,
      description,
    };

    const response = await fetch(`${host}/api/blog/addblog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();
    console.log(json);

    let blog = json;

    setblogs(blogs.concat(blog));
  };

  return (
    <BlogContext.Provider value={{ checked, getBlogs, blogs, addBlog }}>
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogState;
