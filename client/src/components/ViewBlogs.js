import * as React from "react";
// import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import BlogItem from "./BlogItem";
import BlogContext from "../context/BlogContext";

import { useEffect } from "react";

// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   padding: theme.spacing(2),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

export default function ViewBlogs() {
  const context = React.useContext(BlogContext);
  // console.log(context);

  const { getBlogs, blogs } = context;

  useEffect(() => {
    getBlogs();

    // eslint-disable-next-line
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {blogs.map((item) => {
          return Array.from(Array(1)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <BlogItem blogs={item} />
            </Grid>
          ));
        })}
      </Grid>
    </Box>
  );
}
