// use Mongoose
const mongoose = require("mongoose");

// connect to Mongo
const dburl = "mongodb://127.0.0.1:27017/product111DB";
mongoose
  .connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err: string) => console.log(err));

// Schema
let productSchema = mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
});

// create model (collection, model)
let Product = mongoose.model("products111", productSchema);

// export model
module.exports = Product;

// create function for saving data
module.exports.saveProduct = function (model: any, data: any) {
  model.save(data);
};
