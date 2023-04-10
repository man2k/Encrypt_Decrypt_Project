const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const multer = require("multer");
const encryptFile = require("./controllers/encrypt");
const decryptFile = require("./controllers/decrypt");
// const crypto = require("crypto");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/original/");
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

// const key = crypto.randomBytes(16);
// const iv = crypto.randomBytes(16);

const upload = multer({ storage: storage });
let originalFilePath;
let originalFileName;

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  originalFilePath = req.file.path;
  originalFileName = req.file.originalname;
  if (!file) {
    return res.status(400).send("No file Uploaded");
  }
  console.log("File Uploaded Successfully");
  res.status(200).json({ success: true });
  res.end();
});

app.get("/encrypt/:algo", (req, res) => {
  let key = "";
  const { algo } = req.params;
  console.log("algo", algo);
  encryptFile(originalFilePath, "./uploads/enc/encrypted", algo, (err, key) => {
    if (err) {
      console.error("err", err);
      res.status(400).redirect("http://localhost:5173");
    } else if (key) {
      console.log("File Encrypted Successfully");
      res.status(200).json({ key: key.toString("hex") });
    }
  });

  console.log(JSON.stringify({ key: key.toString("hex") }));
});

app.get("/decrypt", (_, res) => {
  decryptFile(
    "./uploads/enc/encrypted",
    `./uploads/dec/${originalFileName}`,
    key,
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("File Decrypted Successfully");
        res.download(
          `./uploads/dec/${originalFileName}`,
          originalFileName,
          (err) => {
            if (err) {
              console.error("Error sending file:", err);
            } else {
              console.log("File sent successfully!");
            }
          }
        );
      }
    }
  );
});

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(3000, () => console.log("Server Listenin on port 3000"));
