import express from "express";
import mongoose from "mongoose";

const app = express();

// Middleware
app.use(express.json());

// MongoDB connection
const MONGO_URI = "mongodb+srv://vishalzalake2028:9xym0tg7BdyKrCIA@cluster0.zttq5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your connection string
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Sample route
app.get("/", (req, res) => {
  res.send("Hello from the backend with MongoDB!");
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
