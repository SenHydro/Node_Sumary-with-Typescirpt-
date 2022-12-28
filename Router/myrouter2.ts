import { Request, Response, NextFunction } from "express";
const express0 = require("express");
const router0 = express0.Router();

router0.get("/", (req: Request, res: Response) => {
  const name = "AAAAA_AAAAA";
  const age = 12;
  const Address = "<h3>Bangkok</h3>";
  const price = ["$1", "$2", "$3", "$4", "$5", "$6", "$7", "$8"];
  const products = [
    { name: "Notebook", price: 100000, image: "images/products/product1.png" },
    { name: "Hood", price: 1000, image: "images/products/product2.png" },
    { name: "Earpieces", price: 1000, image: "images/products/product3.png" },
  ];
  res.render("index1.ejs", {
    name: name,
    age: age,
    Address: Address,
    price: price,
    products: products,
  });
});

module.exports = router0;
