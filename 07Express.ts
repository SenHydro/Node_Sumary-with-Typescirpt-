// use with templates & myrouter from Router

const express = require("express");
import router from "./Router/myrouter";
const app = express();

app.use(router);

app.listen(2001, () => {
  console.log("start server with express");
});
