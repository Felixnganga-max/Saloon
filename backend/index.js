import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db/db.js";
import router from "./routers/serviceRoutes.js";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 9000;

// Connect to MongoDB with error handling
connectDB().catch((err) => {
  console.error("Database connection error:", err);
  process.exit(1); // Exit if DB connection fails
});

// Middleware
app.use(
  cors({
    origin: "*", // Allow all origins (Replace with specific URL in production)
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // ✅ Add PATCH here
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Increase request size limits to avoid "Payload Too Large" error
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Routes
app.use("/api/services", router); // Service routes

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server with error handling
app
  .listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.error("Server error:", err);
  });
