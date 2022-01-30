import React from "react";
import ViewBlogs from "./ViewBlogs";
import { useHistory } from "react-router-dom";
const Home = () => {
  const history = useHistory();
  return (
    <>
      {localStorage.getItem("token") ? (
        <>
          <h1 style={{ textAlign: "center" }}>Your Blogs</h1>
          <ViewBlogs />
        </>
      ) : (
        history.push("/login")
      )}
    </>
  );
};

export default Home;
