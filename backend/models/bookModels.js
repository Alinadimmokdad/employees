import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    cvAttachment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model("Book", bookSchema);
