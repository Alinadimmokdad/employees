import express from "express";
import { mongoDBURL, PORT } from "./config.js";
import mongoose from "mongoose";
import router from "./routes/booksRoute.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { Book } from "./models/bookModels.js";

const app = express();

// Get current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cors());

// Serve the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test Route
app.get("/", (request, response) => {
  return response.status(234).send("Welcome To MERN");
});

// Books Route
app.use("/employees", router);

// MongoDB Connection
mongoose
  .connect(mongoDBURL)
  .then(() => {
    updateDatabaseFields();

    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });

    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

async function updateDatabaseFields() {
  try {
    const result = await Book.updateMany(
      {
        $or: [{ title: { $exists: true } }, { author: { $exists: true } }],
      },
      [
        { $set: { name: "$title", phone: "$author" } },
        { $unset: ["title", "author"] },
      ]
    );
    console.log(`Updated ${result.modifiedCount} documents.`);
  } catch (error) {
    console.error("Error updating documents:", error);
  }
}
