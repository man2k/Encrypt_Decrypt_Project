const crypto = require("crypto");
const fs = require("fs");
function decryptFile(inputFile, outputFile, key, algo, callback) {
  let input = fs.readFileSync(inputFile);
  const iv = Buffer.from(input.toString("hex").slice(0, 32), "hex");
  input = Buffer.from(input.toString("hex").slice(32), "hex");
  const decipher = crypto.createDecipheriv(algo, Buffer.from(key, "hex"), iv);
  const decrypted = Buffer.concat([decipher.update(input), decipher.final()]);
  fs.writeFile(outputFile, decrypted, (err) => {
    if (err) {
      callback(err);
    } else {
      fs.unlink(`${inputFile}`, (err) => {
        if (err) throw err;
      });
      callback(null);
    }
  });
}

module.exports = decryptFile;
