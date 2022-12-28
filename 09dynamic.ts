// use with public & index1 from views & myrouter2 from Router

const express = require("express");
const path = require("path");
const router0 = require("./Router/myrouter2");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(router0);

app.use(express.static(path.join(__dirname, "public"))); // find index.html

app.listen(2003, () => {
  console.log("start server with express");
});
