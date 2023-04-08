const express = require("express");
const app = express();
// const fs = require("fs");
const multer = require("multer");
const encryptFile = require("./controllers/encrypt");
const decryptFile = require("./controllers/decrypt");
const crypto = require("crypto");

// app.use(express.static("./public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/original/");
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const upload = multer({ storage: storage });
let originalFilePath;
let originalFileName;

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  originalFilePath = req.file.path;
  // console.log(originalFilePath);
  originalFileName = req.file.originalname;
  if (!file) {
    return res.status(400).send("No file Uploaded");
  }
  console.log("File Uploaded Successfully");
  res.status(200).redirect("http://localhost:5173");
  res.end();
});

app.get("/encrypt", (req, res) => {
  encryptFile(originalFilePath, "./uploads/enc/encrypted", key, iv, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("File Encrypted Successfully");
    }
  });
  res.status(200).json({ key: key.toString("hex"), iv: iv.toString("hex") });
});

app.get("/decrypt", (req, res) => {
  console.log(key.toString("hex"));
  decryptFile(
    "./uploads/enc/encrypted",
    "./uploads/dec/decrypted.jpg",
    key,
    iv,
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("File Decrypted Successfully");
        res.download("./uploads/dec/decrypted.jpg", "decrypted.jpg", (err) => {
          if (err) {
            console.error("Error sending file:", err);
          } else {
            console.log("File sent successfully!");
          }
        });
      }
    }
  );
});

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(3000, () => console.log("Server Listenin on port 3000"));
