const crypto = require("crypto");
const fs = require("fs");
function decryptFile(inputFile, outputFile, key, iv, callback) {
  const input = fs.readFileSync(inputFile);
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  const decrypted = Buffer.concat([decipher.update(input), decipher.final()]);
  fs.writeFile(outputFile, decrypted, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
}

module.exports = decryptFile;
