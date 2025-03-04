import Service from "../models/serviceModel.js";
import { uploadToCloudinary } from "../config/claudinary.js";
import fs from "fs"; // To delete local files after upload

// @desc Get all services
// @route GET /api/services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get a single service by ID
// @route GET /api/services/:id
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Create a new service with multiple image uploads
export const createService = async (req, res) => {
  try {
    const { name, category, price, duration, description } = req.body;

    // Ensure files are uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Upload images to Cloudinary
    const imageUrls = await Promise.all(
      req.files.map(async (file) => {
        const uploadedImage = await uploadToCloudinary(file.path);
        return uploadedImage;
      })
    );

    // Create a new service entry
    const newService = new Service({
      name,
      category,
      price,
      duration,
      description,
      images: imageUrls, // Save Cloudinary URLs in DB
    });

    await newService.save();

    res
      .status(201)
      .json({ message: "Service created successfully", newService });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Update a service with optional multiple image uploads
// @route PUT /api/services/:id
export const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    let imageUrls = service.images; // Keep existing images

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(async (file) => {
        const url = await uploadToCloudinary(file.path);
        fs.unlinkSync(file.path); // Delete local temp file
        return url;
      });

      imageUrls = await Promise.all(uploadPromises);
    }

    service.name = req.body.name || service.name;
    service.category = req.body.category || service.category;
    service.price = req.body.price || service.price;
    service.duration = req.body.duration || service.duration;
    service.description = req.body.description || service.description;
    service.images = imageUrls;
    service.popular = req.body.popular ?? service.popular;
    service.discount = req.body.discount ?? service.discount;
    service.tags = req.body.tags || service.tags;

    const updatedService = await service.save();
    res.json(updatedService);
  } catch (error) {
    res.status(400).json({ message: "Invalid update data" });
  }
};

// @desc Delete a service by ID
// @route DELETE /api/services/:id
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    res.json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
