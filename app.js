const express = require("express");
const app = express();
const connectToDatabase = require("./database");
const Book = require("./model/bookModel");
const fs = require("fs");
connectToDatabase();

// Middleware to parse JSON bodies
app.use(express.json());

const { multer, storage } = require("./middleware/multerConfig");
const upload = multer({ storage: storage });

//cors package
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    name: "vector",
    age: 22,
  });
});

app.post("/book", upload.single("bookImage"), async (req, res) => {
  if (req.file) {
    console.log(req.file);
  }
  const {
    bookName,
    bookPrice,
    authorName,
    isbnNumber,
    publishDate,
    publication,
  } = req.body;
  const imageUrl = req.file ? req.file.filename : null;

  await Book.create({
    bookName,
    bookPrice,
    authorName,
    isbnNumber,
    publishDate,
    publication,
    imageUrl,
  });
  res.status(201).json({
    message: "book created successfully",
  });
});

app.get("/book", async (req, res) => {
  const books = await Book.find();
  res.status(200).json({
    message: "books fetched successfully",
    data: books,
  });
});

//single read

app.get("/book/:id", async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  res.json({
    message: "single book fetched successfully",
    data: book,
  });
});

app.delete("/book/:id", async (req, res) => {
  const id = req.params.id;
  await Book.findByIdAndDelete(id);
  res.json({
    message: "Selected Book has been deleted",
  });
});

//update
app.patch("/book/:id", upload.single("Image"), async (req, res) => {
  const id = req.params.id;
  const {
    bookName,
    bookPrice,
    authorName,
    isbnNumber,
    publishDate,
    publication,
  } = req.body;
  const oldFile = await Book.findById(id);
  if (req.file) {
    const imagePath = oldFile.imageUrl;
    fs.unlink(`./Storage/${imagePath}`, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("file deleted");
      }
    });
  }
  await Book.findByIdAndUpdate(id, {
    bookName,
    bookPrice,
    authorName,
    isbnNumber,
    publishDate,
    publication,
  });
  res.status(200).json({
    message: "Book Updated Successfully",
  });
});

app.use(express.static("./storage/"));

//do not us (./)-->give all access
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
