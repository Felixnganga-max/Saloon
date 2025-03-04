import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true }, // Duration in minutes
    description: { type: String, required: true },
    images: [{ type: String }], // Array of image URLs
    popular: { type: Boolean, default: false },
    discount: { type: Number, default: 0 },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);
export default Service;
