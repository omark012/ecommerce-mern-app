import express from "express";
const app = express();
import path from "path";
import dotenv from "dotenv";
import { connectDb } from "./db-connection.js";
import productRoutes from "./routes/productRoutes.js";
dotenv.config();
import cors from "cors"; // If you need CORS

const port = process.env.PORT || 5000;
const __dirname = path.resolve();
//middleware

// Middleware to parse URL-encoded data (from forms)-->
app.use(express.urlencoded({ extended: true }));
//allows us to accept JSON data in the req.body-->
app.use(express.json());
app.use(cors()); // Enable CORS if needed

// middleware for product routes
app.use("/product", productRoutes);
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  //Serve static files from React app
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  //Default api
  // The catch-all handler to send back React's index.html file for any unknown routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  connectDb();
  console.log(`App is running on http://localhost:${port}`);
});
