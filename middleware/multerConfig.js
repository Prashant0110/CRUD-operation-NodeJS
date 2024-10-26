const multer = require("multer");
const fileLimit = 1024; // 1 MB limit

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Storage"); // Set destination folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Set unique filename
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: fileLimit, // Limit file size to 1 MB
  },
  fileFilter: function (req, file, cb) {
    if (file.size > fileLimit) {
      return cb(new Error("This file type is too large!"));
    }

    cb(null, true);
  },
});

module.exports = {
  storage,
  multer,
};
