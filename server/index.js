const express = require("express");
const dotenv = require("dotenv");
const app = express();

const cors = require("cors");
dotenv.config({ path: './config.env' });
const PORT = process.env.PORT;

require("./db");
app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/blog", require("./routes/blogs"));

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
