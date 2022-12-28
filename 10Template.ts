// use with public & index from views & myrouter3 from Router & Models

const express1 = require("express");
const path1 = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const router1 = require("./Router/myrouter3");
const app1 = express1();

app1.set("views", path1.join(__dirname, "views"));
app1.set("view engine", "ejs");

app1.use(cookieParser());
app1.use(express1.urlencoded({ extended: false }));
app1.use(
  session({ secret: "session11", resave: false, saveUninitialized: false })
);
app1.use(router1);
app1.use(express1.static(path1.join(__dirname, "public"))); // find index.html

app1.listen(2004, () => {
  console.log("start server with express");
});
