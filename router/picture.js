const express = require('express');
const multer = require("multer");
const path = require('path');
const fs = require('fs');

const router = express.Router();

const upload = multer({
  dest: "../assets"
});

router.post("/", upload.single("picture"), (req, res) => {
  const tempPath = req.file.path;
  const targetPath = path.join(__dirname, `../assets/${req.file.filename}${path.extname(req.file.originalname).toLowerCase()}`);
  fs.rename(tempPath, targetPath, (error) => {
    if (error) {
      return res.status(500).json('Oops! Something went wrong!')
    } else {
      res.status(200).json(`${req.file.filename}${path.extname(req.file.originalname).toLowerCase()}`);
    }
  });
});

module.exports = router;
