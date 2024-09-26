import mongoose from "mongoose";
import Product from "../models/product-model.js";

//Retrieve products from DB
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(`Error while fetching products ${error.message}`);
    res.status(500).json({ success: false, message: "server error" });
  }
};

//Create new Product and save to DB
export const createProduct = async (req, res) => {
  const { fullname, price, image } = req.body;
  if (!fullname || !price || !image) {
    console.log(req.body);
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the fields" });
  }

  try {
    const newProduct = await Product.create({
      fullname,
      price,
      image,
    });
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error while creating new product:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Error while creating new product" });
  }
};

//Update the product stored in DB
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "product not found" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.log("Cannot update the product", error.message);
    res.status(500).json({ success: false, message: "Cannot update" });
  }
};

//Delete the product stored in DB
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findOneAndDelete({ _id: id });
    res
      .status(200)
      .json({ success: true, message: "Product Deleted Successfully" });
  } catch (error) {
    console.log("Error while deleting the product", error.message);

    res.status(404).json({ success: false, message: "Product Not Found" });
  }
};
