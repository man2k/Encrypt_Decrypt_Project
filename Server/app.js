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
const steganograph = require("./controllers/steganograph");
const unsteganograph = require("./controllers/unsteganograph");

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static("./public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/store");
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${req.url}`;
    cb(null, filename);
  },
});

const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/store/steganograph");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
const upload2 = multer({ storage: storage2 });
let originalFileName;
let originalFilePath;

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  originalFilePath = req.file.path;
  originalFileName = req.file.originalname;
  if (!file) {
    return res.status(400).json({ error: "File Upload Failed" });
  }
  console.log("File Uploaded Successfully");
  res.status(200).json({ success: true });
  // res.end();
});

app.post(
  "/upload/steg",
  upload2.fields([
    {
      name: "file",
      maxCount: 1,
    },
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  (req, res) => {
    const file = req.files["file"][0];
    const image = req.files["image"][0];
    // console.log("Uploaded files:", file.filename, image.filename);
    let stegFile;
    steganograph(
      [
        `./uploads/store/steganograph/${file.filename}`,
        `./uploads/store/steganograph/${image.filename}`,
      ],
      [`./uploads/store/steganograph/steganographed.jpg`],
      (err, data) => {
        stegFile = fs.readFileSync(
          `./uploads/store/steganograph/steganographed.jpg`
        );
      }
    );
    const options = {
      root: path.join(__dirname, `./uploads/store/steganograph`),
    };
    res.sendFile("steganographed.jpg", options, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("file sent successfully");
        // return null;
      }
    });
  }
);
const Jimp = require("jimp");

app.get("/unsteg", (req, res) => {
  unsteganograph(
    "./uploads/store/steganograph/steganographed.jpg",
    "./uploads/img1.jpg",
    "./uploads/img2.jpg",
    function (err, results) {
      if (err) {
        console.error(err);
        return;
      }

      const original1 = results[0];
      const original2 = results[1];

      console.log("Original image 1:", original1);
      console.log("Original image 2:", original2);

      res.download("uploads/img1.jpg");
    }
  );
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

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
