const express = require("express");
const app = express();
const connectToDatabase = require("./database");
const Book = require("./model/bookModel");
connectToDatabase();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    name: "vector",
    age: 22,
  });
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.post("/book", async (req, res) => {
  const {
    bookName,
    bookPrice,
    authorName,
    isbnNumber,
    publishDate,
    publication,
  } = req.body;
  await Book.create({
    bookName,
    bookPrice,
    authorName,
    isbnNumber,
    publishDate,
    publication,
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
