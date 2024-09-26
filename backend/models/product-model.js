import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } //gives createdAt and updatedAt
);

const Product = mongoose.model("Product", productSchema);
// mongoose will create collection in MongoDB in plural and first letter in lowercase -->  "products"
export default Product;
