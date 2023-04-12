const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
  exposedHeaders: ["Content-Disposition", "filename"],
};
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const encryptFile = require("./controllers/encryptFile");
const decryptFile = require("./controllers/decryptFile");

app.use(cors(corsOptions));
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/store/");
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });
let originalFilePath;
let originalFileName;

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  originalFilePath = req.file.path;
  originalFileName = req.file.originalname;
  if (!file) {
    return res.status(400).json({ error: "File Upload Failed" });
  }
  console.log("File Uploaded Successfully");
  res.status(200).json({ success: true });
  res.end();
});

app.get("/encrypt/:algo", (req, res) => {
  let key = "";
  const { algo } = req.params;
  encryptFile(
    originalFilePath,
    "./uploads/store/encrypted",
    algo,
    (err, key) => {
      if (err) {
        console.error("err", err);
        res.status(400).redirect("http://localhost:5173");
      } else if (key) {
        console.log("File Encrypted Successfully");
        // console.log(JSON.stringify({ key: key.toString("hex") }));
        res.status(200).json({ key: key.toString("hex") });
      }
    }
  );
});

app.post("/decrypt/:algo", (req, res) => {
  const { algo } = req.params;
  decryptFile(
    "./uploads/store/encrypted",
    `./uploads/store/${originalFileName}`,
    req.body.key,
    algo,
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("File Decrypted Successfully");

        const options = {
          root: path.join(__dirname, `./uploads/store/`),
        };
        res.header("filename", originalFileName);
        res.sendFile(originalFileName, options, (e) => {
          if (e) {
            console.log(e);
          } else {
            console.log("File Sent Successfully");
          }
        });
      }
    }
  );
});

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(3000, () => console.log("Server Listenin on port 3000"));
