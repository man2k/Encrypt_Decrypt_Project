const Jimp = require("jimp");
const fs = require("fs");

// const steganograph = async (inputPath1, inputPath2) => {
//   // Load the original file as grayscale
//   const originalImage = await Jimp.read(inputPath1);
//   originalImage.greyscale();

//   // Load the cover image
//   const coverImage = await Jimp.read(inputPath2);
//   console.log(typeof originalImage);
//   const originalBuffer = originalImage.bitmap.data;
//   const originalBinary = Array.from(originalBuffer)
//     .map((byte) => byte.toString(2).padStart(8, "0"))
//     .join("");

//   let i = 0;
//   coverImage.scan(
//     0,
//     0,
//     coverImage.bitmap.width,
//     coverImage.bitmap.height,
//     (x, y, idx) => {
//       const coverBinary = coverImage.bitmap.data[idx]
//         .toString(2)
//         .padStart(8, "0");
//       const newBinary = coverBinary.slice(0, -1) + originalBinary[i];
//       const newDecimal = parseInt(newBinary, 2);
//       coverImage.bitmap.data[idx] = newDecimal;
//       i++;
//     }
//   );

//   await coverImage.writeAsync(
//     "../uploads/store/steganograph/steganographed.jpg"
//   );
// };

// module.exports = steganograph;

// function steganograph(inputPath, outputPath, callback) {
//   Jimp.read(inputPath, function (err, image) {
//     if (err) {
//       return callback(err);
//     }
//     image
//       .resize(250, Jimp.AUTO) // resize the image to width 250 and maintain aspect ratio
//       .quality(60) // set JPEG quality to 60
//       .write(outputPath, function (err) {
//         if (err) {
//           return callback(err);
//         }
//         fs.readFile(outputPath, function (err, data) {
//           if (err) {
//             return callback(err);
//           }
//           callback(null, data);
//         });
//       });
//   });
// }

// fs.readFileSync(
//   `./uploads/store/${originalFileName}.enc`
// );

function steganograph(inputPaths, outputPaths, callback) {
  if (inputPaths.length !== 2 || outputPaths.length !== 1) {
    return callback(
      new Error("Input and output arrays must have the correct length")
    );
  }

  const input1Path = inputPaths[0];
  const input2Path = inputPaths[1];
  const outputPath = outputPaths[0];

  Jimp.read(input1Path, function (err, input1) {
    if (err) {
      return callback(err);
    }

    Jimp.read(input2Path, function (err, input2) {
      if (err) {
        return callback(err);
      }

      const output = new Jimp(input1.getWidth(), input1.getHeight());

      for (let x = 0; x < input1.getWidth(); x++) {
        for (let y = 0; y < input1.getHeight(); y++) {
          const input1Color = Jimp.intToRGBA(input1.getPixelColor(x, y));
          const input2Color = Jimp.intToRGBA(input2.getPixelColor(x, y));

          const outputColor = Jimp.rgbaToInt(
            input1Color.r,
            input1Color.g,
            input1Color.b,
            (input1Color.a & 0xfe) | (input2Color.r & 0x01)
          );

          output.setPixelColor(outputColor, x, y);
        }
      }

      output.write(outputPath, function (err) {
        if (err) {
          return callback(err);
        }

        fs.readFile(outputPath, function (err, data) {
          if (err) {
            return callback(err);
          }

          callback(null, data);
        });
      });
    });
  });
}

module.exports = steganograph;
