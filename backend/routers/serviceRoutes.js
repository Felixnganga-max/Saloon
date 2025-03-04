import express from "express";
import upload from "../config/claudinary.js"; // Make sure this matches your actual filename
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

const router = express.Router();

/**
 * @route   GET /api/services
 * @desc    Fetch all services
 * @access  Public
 */
router.get("/", getServices);

/**
 * @route   POST /api/services
 * @desc    Create a new service with multiple image uploads
 * @access  Private (requires authentication)
 * @param   {string} name - Service name
 * @param   {string} category - Service category (e.g., nails, hair)
 * @param   {number} price - Service price
 * @param   {number} duration - Duration in minutes
 * @param   {string} description - Service description
 * @param   {boolean} popular - Mark as popular (true/false)
 * @param   {number} discount - Discount percentage
 * @param   {array} tags - List of tags
 * @param   {file[]} images - Upload multiple images (max 5)
 */
router.post("/", upload.array("images", 5), createService);

/**
 * @route   GET /api/services/:id
 * @desc    Fetch a single service by ID
 * @access  Public
 * @param   {string} id - Service ID
 */
router.get("/:id", getServiceById);

/**
 * @route   PATCH /api/services/:id
 * @desc    Update an existing service (allows partial updates, including image updates)
 * @access  Private (requires authentication)
 * @param   {string} id - Service ID
 * @param   {file[]} images - Upload new images (optional)
 */
router.patch("/:id", upload.array("images", 5), updateService);

/**
 * @route   DELETE /api/services/:id
 * @desc    Delete a service by ID
 * @access  Private (requires authentication)
 * @param   {string} id - Service ID
 */
router.delete("/:id", deleteService);

export default router;
