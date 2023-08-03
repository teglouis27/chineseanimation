//This outputs only the black pixels.
const fs = require('fs');
const PNG = require('pngjs').PNG;

let pixelData = [];
let blackPixels = [];

fs.createReadStream('熙.png')
  .pipe(new PNG({
    filterType: 4,
  }))
  .on('parsed', function() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        let idx = (this.width * y + x) << 2;

        let red = this.data[idx];
        let green = this.data[idx + 1];
        let blue = this.data[idx + 2];

        pixelData.push([x, y, [red, green, blue]]);

        // If the pixel is black, add it to the blackPixels array
        if (red == 0 && green == 0 && blue == 0) {
          blackPixels.push([x, y, [red, green, blue]]);
        }
      }
    }
    console.log(blackPixels); // Check your data
  });
