import { exec } from "child_process";
import { Request, Response, NextFunction } from "express";
const express1 = require("express");
const router1 = express1.Router();
const Product = require("../Models/products");

interface MulterRequest extends Request {
  file: any;
  session: any;
  sessionID: string;
}

///////////////////////////////////// upload file
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req: MulterRequest, file: any, cb: any) {
    cb(null, "./public/images/products"); // locate file path
  },
  filename: function (req: MulterRequest, file: any, cb: any) {
    cb(null, Date.now() + ".jpg"); // change file name prevent same name
  },
});

const upload = multer({
  storage: storage,
});

///////////////////////////////////// go to homepage
router1.get("/", (req: MulterRequest, res: Response) => {
  Product.find().exec((err: string, doc: any) => {
    res.render("index.ejs", {
      products: doc,
    });
  });
});

///////////////////////////////////// go to addform ///////// use cookie to login
router1.get("/addform", (req: MulterRequest, res: Response) => {
  if (req.cookies.login) {
    res.render("form.ejs"); // if already login go to addform
  } else {
    res.render("admin.ejs"); // if not login go to loginPage
  }
});

///////////////////////////////////// go to managementPage ///////// use session to login
router1.get("/manage", (req: MulterRequest, res: Response) => {
  if (req.session.login) {
    Product.find().exec((err: string, doc: any) => {
      res.render("manage.ejs", {
        products: doc,
      });
    });
  } else {
    res.render("admin.ejs");
  }
  // show data in session
  console.log("SessionID = ", req.sessionID);
  console.log("Sessiondata = ", req.session);
});

///////////////////////////////////// clear cookie & session
router1.get("/logout", (req: MulterRequest, res: Response) => {
  res.clearCookie("username");
  res.clearCookie("password");
  res.clearCookie("loogin");
  req.session.destroy((err: Error) => {
    res.render("admin.ejs");
  });
});

///////////////////////////////////// delete product follow ID
router1.get("/delete/:id", (req: MulterRequest, res: Response) => {
  console.log("Delete ID = ", req.params.id);
  Product.findByIdAndDelete(req.params.id, { useFindAndModify: false }).exec(
    (err: string) => {
      if (err) console.log(err);
      res.redirect("/manage");
    }
  );
});

///////////////////////////////////// create new product to DB
router1.post(
  "/insert",
  upload.single("image"),
  (req: MulterRequest, res: Response) => {
    // console.log(req.file);
    // console.log(req.body.name);
    // console.log(req.body.price);
    // console.log(req.body.image);
    // console.log(req.body.description);
    let data1 = new Product({
      name: req.body.name,
      price: req.body.price,
      image: req.file.filename,
      description: req.body.description,
    });
    // console.log(data1);
    // console.log(Product.saveProduct(data1));

    Product.saveProduct(data1, (err: string) => {
      if (err) console.log(err);
      res.redirect("/");
    });
  }
);

///////////////////////////////////// go to ProductPage
router1.get("/:id", (req: MulterRequest, res: Response) => {
  const product_id = req.params.id;
  console.log(product_id);
  Product.findOne({ _id: product_id }).exec((err: string, doc: any) => {
    // console.log(doc);
    res.render("product.ejs", { product: doc });
  });
});

///////////////////////////////////// go to EditPage
router1.post("/edit", (req: MulterRequest, res: Response) => {
  const edit_id = req.body.edit_id;
  console.log(edit_id);
  Product.findOne({ _id: edit_id }).exec((err: string, doc: any) => {
    console.log(doc);
    res.render("edit.ejs", { product: doc });
  });
});

///////////////////////////////////// Edit product detail in DB
router1.post("/update", (req: MulterRequest, res: Response) => {
  // data from edit form
  // console.log(req.body);
  const update_id = req.body.update_id;
  let data = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  };
  Product.findByIdAndUpdate(update_id, data, { useFindAndModify: false }).exec(
    (err: string) => {
      if (err) console.log(err);
      res.redirect("/manage");
    }
  );
});

///////////////////////////////////// login by compare username&password then create cookie
router1.post("/login", (req: MulterRequest, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  const timeExpire = 30000; // 30 second

  if (username === "admin" && password === "123") {
    // create cookie for save admin account
    res.cookie("usrename", username, { maxAge: timeExpire });
    res.cookie("password", password, { maxAge: timeExpire });
    res.cookie("login", true, { maxAge: timeExpire }); // true = already login

    // create a new session
    req.session.username = username;
    req.session.password = password;
    req.session.login = true;
    req.session.cookie.maxAge = timeExpire;
    res.redirect("/manage");
  } else {
    res.render("404.ejs");
  }
});

module.exports = router1;
