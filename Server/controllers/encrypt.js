const crypto = require("crypto");
const fs = require("fs");

function encryptFile(inputFile, outputFile, key, iv, callback) {
  const input = fs.readFileSync(inputFile);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  const encrypted = Buffer.concat([iv, cipher.update(input), cipher.final()]);
  fs.writeFile(outputFile, encrypted, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
}

module.exports = encryptFile;
