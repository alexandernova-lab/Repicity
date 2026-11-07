import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config({
  path: ".env",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadSingleImage = async (file, folder_name) => {
  const image = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

  const response = await cloudinary.uploader.upload(image, {
    folder: folder_name,
  });

  return {
    image_url: response.secure_url,
    public_alt: response.public_id,
  };
};

export const deleteImage = async (public_alt) => {
  const res = await cloudinary.uploader.destroy(public_alt);

  return res?.result === "ok";
};

export default cloudinary;
