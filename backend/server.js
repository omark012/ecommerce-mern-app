import express from "express";
const app = express();
const port = 3000;

import dotenv from "dotenv";
import { connectDb } from "./db-connection.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

//middleware

// Middleware to parse URL-encoded data (from forms)
app.use(express.urlencoded({ extended: true }));
//allows us to accept JSON data in the req.body
app.use(express.json());

// middleware for product routes
app.use("/api/product", productRoutes);

//Default api
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  connectDb();
  console.log(`App is running on port: ${port}`);
});
