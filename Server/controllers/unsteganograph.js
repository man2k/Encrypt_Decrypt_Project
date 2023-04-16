const fs = require("fs");
const async = require("async");
const Jimp = require("jimp");

function unsteganograph(inputPath, outputPath1, outputPath2, callback) {
  // Read the steganographed image
  Jimp.read(inputPath, function (err, image) {
    if (err) {
      return callback(err);
    }

    const width = image.getWidth();
    const height = image.getHeight();

    // Extract the hidden data from the steganographed image
    const data = [];
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const color = Jimp.intToRGBA(image.getPixelColor(x, y));
        const bit = color.r & 0x01;
        data.push(bit);
      }
    }

    // Split the hidden data into two arrays
    const data1 = data.slice(0, data.length / 2);
    const data2 = data.slice(data.length / 2);

    // Convert the hidden data to a Buffer
    const buffer1 = Buffer.from(data1);
    const buffer2 = Buffer.from(data2);

    // Write the hidden data to files
    fs.writeFile(outputPath1, buffer1, function (err) {
      if (err) {
        return callback(err);
      }

      fs.writeFile(outputPath2, buffer2, function (err) {
        if (err) {
          return callback(err);
        }

        // Load the original1 and original2 images
        async.parallel(
          [
            function (callback) {
              Jimp.read(outputPath1, callback);
            },
            function (callback) {
              Jimp.read(outputPath2, callback);
            },
          ],
          function (err, results) {
            if (err) {
              return callback(err);
            }

            const original1 = results[0];
            const original2 = results[1];

            // Write the original1 and original2 images to files
            original1.write(
              outputPath1.replace(".txt", ".jpg"),
              function (err) {
                if (err) {
                  return callback(err);
                }

                original2.write(
                  outputPath2.replace(".txt", ".jpg"),
                  function (err) {
                    if (err) {
                      return callback(err);
                    }

                    callback(null, "Done");
                  }
                );
              }
            );
          }
        );
      });
    });
  });
}

module.exports = unsteganograph;
