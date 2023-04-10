const crypto = require("crypto");
const fs = require("fs");

function encryptFile(inputFile, outputFile, algo, callback) {
  // console.log(inputFile);
  const input = fs.readFileSync(inputFile);
  console.log("algo2", algo);
  const n = algo.replace(/[^0-9]/g, "");
  // if (algo.includes("128")) {
  //   const key = crypto.randomBytes(16);
  //   const iv = crypto.randomBytes(16);
  // } else if (algo.includes("192")) {
  //   const key = crypto.randomBytes(24);
  //   const iv = crypto.randomBytes(16);
  // } else if (algo.includes("256")) {
  //   const key = crypto.randomBytes(32);
  //   const iv = crypto.randomBytes(16);
  // }
  key = crypto.randomBytes(n / 8);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algo, key, iv);
  const encrypted = Buffer.concat([iv, cipher.update(input), cipher.final()]);
  fs.writeFile(outputFile, encrypted, (err) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, key);
    }
    return key;
  });
}

module.exports = encryptFile;
