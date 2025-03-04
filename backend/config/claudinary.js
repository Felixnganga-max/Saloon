import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Cloudinary Configuration
cloudinary.v2.config({
  cloud_name: "dfuv6m4va",
  api_key: "528637913152672",
  api_secret: "kyLOb0R45nMaH-3c2AgxoDwRw1A",
});

// Multer storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: async (req, file) => ({
    folder: "products",
    format: file.mimetype.split("/")[1], // Extract format from MIME type
    resource_type: "auto", // Automatically detect file type
  }),
});

// Multer middleware for file uploads
const upload = multer({ storage });

// Function to manually upload files to Cloudinary
const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.v2.uploader.upload(filePath, {
      folder: "products",
    });
    return result.secure_url; // Return Cloudinary image URL
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

// Exporting modules properly
export { upload as default, uploadToCloudinary, cloudinary };
