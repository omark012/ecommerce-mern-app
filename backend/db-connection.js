import mongoose from "mongoose";

const connectDb = async (req, res) => {
  try {
    let conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database connected to :${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1); // here 1 - means exit with failure, 0 - means exit with success
  }
};

export { connectDb };
