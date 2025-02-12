import mongoose from "mongoose";
import { mongoDBURL } from "./config.js";
import { Book } from "./models/bookModel.js"; // Adjust the import path if needed

// Connect to MongoDB
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connected to MongoDB");
    updateTitlesToNames();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

async function updateTitlesToNames() {
  try {
    const result = await Book.updateMany(
      { title: { $exists: true } },
      [{ $set: { name: "$title" } }, { $unset: "title" }] // Set 'name' field and remove 'title'
    );
    console.log(`Updated ${result.modifiedCount} documents.`);
    mongoose.disconnect(); // Disconnect from MongoDB after the update is done
  } catch (error) {
    console.error("Error updating documents:", error);
    mongoose.disconnect();
  }
}
