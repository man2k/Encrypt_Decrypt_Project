const crypto = require("crypto");
const fs = require("fs");
function decryptFile(inputFile, outputFile, key, callback) {
  let input = fs.readFileSync(inputFile);
  const iv = Buffer.from(input.toString("hex").slice(0, 32), "hex");
  input = Buffer.from(input.toString("hex").slice(32), "hex");
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
