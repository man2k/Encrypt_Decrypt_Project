const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
  exposedHeaders: ["Content-Disposition", "filename", "x-key"],
};
require("dotenv").config();

const port = process.env.PORT || 8080;

const path = require("path");
const fs = require("fs");
const multer = require("multer");
const encryptFile = require("./controllers/encryptFile");
const decryptFile = require("./controllers/decryptFile");

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static("./public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/store");
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
  const { algo } = req.params;
  if (fs.existsSync(originalFilePath) && originalFilePath) {
    encryptFile(
      originalFilePath,
      `./uploads/store/${originalFileName}.enc`,
      algo,
      (err, key) => {
        if (err) {
          console.error("err", err);
          res.status(400).redirect("http://localhost:5173");
        } else if (key) {
          console.log("File Encrypted Successfully");
          const file = fs.readFileSync(
            `./uploads/store/${originalFileName}.enc`
          );
          res
            .status(200)
            .set("x-key", key.toString("hex"))
            .download(`./uploads/store/${originalFileName}.enc`); //.json({ key: key.toString("hex") });
        }
      }
    );
  } else {
    res.json({ success: false });
  }
});

app.post("/decrypt/:algo", (req, res) => {
  const { algo } = req.params;
  if (fs.existsSync(originalFilePath)) {
    console.log(originalFilePath);
    decryptFile(
      originalFilePath,
      `./uploads/store/${originalFileName.replace(".enc", "")}`,
      req.body.key,
      algo,
      (err) => {
        if (err) {
          console.error("err", err);
        } else {
          console.log("File Decrypted Successfully");

          const options = {
            root: path.join(__dirname, `./uploads/store/`),
          };
          res.header("filename", originalFileName.replace(".enc", ""));
          res.sendFile(originalFileName.replace(".enc", ""), options, (e) => {
            if (e) {
              console.log(e);
            } else {
              console.log("File Sent Successfully");
              fs.unlink(
                `./uploads/store/${originalFileName.replace(".enc", "")}`,
                (err) => {
                  if (err) throw err;
                }
              );
            }
          });
        }
      }
    );
  } else {
    res.json({ success: false });
  }
});

app.get("/steg", (req, res) => {});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.listen(3000, () => console.log("Server Listenin on port 3000"));
