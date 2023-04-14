const Jimp = require("jimp");

const steganograph = async () => {
  // Load the original file as grayscale
  const originalImage = await Jimp.read("path/to/original/file");
  originalImage.greyscale();

  // Load the cover image
  const coverImage = await Jimp.read("path/to/cover/image");

  const originalBuffer = originalImage.bitmap.data;
  const originalBinary = Array.from(originalBuffer)
    .map((byte) => byte.toString(2).padStart(8, "0"))
    .join("");

  let i = 0;
  coverImage.scan(
    0,
    0,
    coverImage.bitmap.width,
    coverImage.bitmap.height,
    (x, y, idx) => {
      const coverBinary = coverImage.bitmap.data[idx]
        .toString(2)
        .padStart(8, "0");
      const newBinary = coverBinary.slice(0, -1) + originalBinary[i];
      const newDecimal = parseInt(newBinary, 2);
      coverImage.bitmap.data[idx] = newDecimal;
      i++;
    }
  );

  await coverImage.writeAsync("path/to/encrypted/image");
};

module.exports = steganograph;
