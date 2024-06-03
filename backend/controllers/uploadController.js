import cloudinary from "cloudinary";
const myCloudinary = cloudinary.v2;
import fs from "fs";

const uploadProductImage = async (req, res) => {
  console.log(req.files);
  const result = await myCloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "file-upload",
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(200).json({ image: { src: result.secure_url } });
};

export default uploadProductImage;
