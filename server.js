const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(bodyParser.json());

mongoose.connect(
   "mongodb+srv://raf:1234@testcluster1.s4ly9.mongodb.net/la-tienda-bd?retryWrites=true&w=majority",
   {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
   }
);

const Product = mongoose.model(
   "Product",
   new mongoose.Schema({
      _id: {
         type: String,
         default: shortid.generate,
      },
      title: String,
      description: String,
      image: String,
      price: Number,
      availableSizes: [String],
   })
);

app.get("/api/products", async (req, res) => {
   try {
      const products = await Product.find({});
      res.send(products);
   } catch (err) {
      res.send(err.message);
   }
});

app.post("/api/products", async (req, res) => {
   const newProduct = new Product(req.body);
   const savedProduct = await newProduct.save();
   res.send(savedProduct);
});

app.delete("app/products/:id", async (req, res) => {
   const deletedProduct = await Product.findByIdAndDelete(req.params.id);
   res.send(deletedProduct);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server at ${port} `));
