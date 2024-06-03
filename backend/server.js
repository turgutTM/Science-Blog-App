import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
dotenv.config();
const app = express();

//routers
import authRouter from "./routes/authRoutes.js";
import scienceRouter from "./routes/scienceRouter.js";

app.use(express.json());
app.use(cors());
app.use(fileUpload({ useTempFiles: true }));

import cloudinary from "cloudinary";
const myCloudinary = cloudinary.v2;
myCloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use("/api/scientists/", scienceRouter);
app.use("/api/auth/", authRouter);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
