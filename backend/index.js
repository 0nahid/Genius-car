const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

require("dotenv").config();
console.log(process.env); // remove this after you've confirmed it working

app.get("/", (req, res) =>
  res.send({ status: `Server is running on port ${port}` })
);
app.listen(port, () =>
  console.log({ status: `Server is running on port ${port}` })
);
