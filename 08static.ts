// use with public1

const express0 = require("express");
const path0 = require("path");
const app0 = express0();

app0.use(express0.static(path0.join(__dirname, "public1"))); // find index.html

app0.listen(2002, () => {
  console.log("start server with express");
});
