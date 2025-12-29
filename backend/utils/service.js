import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadImage = async (filePath) => {
  try {
    const uploadResult = await cloudinary.uploader
      .upload(filePath, {
        resource_type: "auto",
      })
      .catch((error) => {
        console.log(error);
      });

    return uploadResult;
  } catch (error) {
    console.log(error);
  }
};

export { uploadImage };
