// Manage routing

import { Request, Response, NextFunction } from "express";
const express = require("express");
const router = express.Router();
const path = require("path");

// reference path from location
const indexPage = path.join(__dirname, "../templates/index.html");
const Product1 = path.join(__dirname, "../templates/product1.html");
const Product2 = path.join(__dirname, "../templates/product2.html");
const Product3 = path.join(__dirname, "../templates/product3.html");

router.get("/", (req: Request, res: Response) => {
  res.status(200);
  res.type("text/html");
  res.sendFile(indexPage);
});

router.get("/product/:id", (req: Request, res: Response) => {
  const productID = req.params.id;
  //   console.log(req.params);
  if (productID === "1") {
    res.sendFile(Product1);
  } else if (productID === "2") {
    res.sendFile(Product2);
  } else if (productID === "3") {
    res.sendFile(Product3);
  } else if (productID === "4") {
    res.redirect("/");
  } else {
    res.status(404);
    res.send("<h1>404 Not Found</h1>");
  }
});

export default router;
