import express from "express";
import multer from "multer";
import { Book } from "../models/bookModels.js";

const router = express.Router();

// Multer setup for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder to save images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

const upload = multer({ storage });

// CREATE Book with Image
router.post(
  "/",
  upload.fields([{ name: "publisherImage" }, { name: "cvAttachment" }]),
  async (req, res) => {
    try {
      const { name, phone, startDate, salary } = req.body;
      const publisher = req.files["publisherImage"]
        ? req.files["publisherImage"][0].path
        : "";
      const cvAttachment = req.files["cvAttachment"]
        ? req.files["cvAttachment"][0].path
        : "";

      if (!name || !phone || !publisher || !startDate || !salary) {
        return res.status(400).send({ message: "Send All Required Fields" });
      }

      const newBook = {
        name,
        phone,
        publisher,
        startDate,
        salary,
        cvAttachment,
      };
      const book = await Book.create(newBook);

      return res.status(201).send(book);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  }
);

// GET All Books with Optional Search
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const books = await Book.find(query);
    res.status(200).json({ count: books.length, data: books });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET Book by ID
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

// DELETE Book by ID
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: "Book not Found" });
    }
    return response.status(200).send({ message: "Book Deleted" });
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

// UPDATE Book with Image
router.put(
  "/:id",
  upload.fields([{ name: "publisherImage" }, { name: "cvAttachment" }]),
  async (req, res) => {
    try {
      const { name, phone, startDate, salary } = req.body;
      const publisher = req.files["publisherImage"]
        ? req.files["publisherImage"][0].path
        : req.body.publisher;
      const cvAttachment = req.files["cvAttachment"]
        ? req.files["cvAttachment"][0].path
        : req.body.cvAttachment;

      if (!name || !phone || !publisher || !startDate || !salary) {
        return res.status(400).send({ message: "Send All Required Fields" });
      }

      const result = await Book.findByIdAndUpdate(req.params.id, {
        name,
        phone,
        publisher,
        startDate,
        salary,
        cvAttachment,
      });

      if (!result) return res.status(404).json({ message: "Book not Found" });
      res.status(200).send({ message: "Book Updated" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  }
);

export default router;
