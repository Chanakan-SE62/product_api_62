import express from "express";
const router = express.Router();
import Product from "../models/Product.js";
 
router.get("/", (req, res) => {
  res.send("RestfulAPI");
});

//get all
//http://localhost:5000/api/products
router.get("/products", async(req, res) => {
    const products = await Product.find({});
    res.json(products);
});

//get by id
router.get("/products/:id", async(req, res) => {
    const { id } = req.params;
    const products = await Product.findById(id);
    res.json(products);
});

//create new product
//http://localhost:5000/api/products
router.post("/products", async(req, res) => {
    const payload = req.body;
    const product = new Product(payload);
    await product.save();
    res.json({message:"Product added !!"})
});

//update product by id
//http://localhost:5000/api/products/61cd788a4487a0744477c476
router.put("/products/:id", async(req, res) => {
    const {id} = req.params;
    const payload = req.body;
    const product = await Product.findByIdAndUpdate(id, {$set:payload});
    res.json({message:`Product Id ${id} is updated`});
});

//delete product by id
//http://localhost:5000/api/products/61cd788a4487a0744477c476
router.delete("/products/:id", async(req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({message:`Product Id ${id} is delete` });
});

export default router;