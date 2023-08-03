//This reads the PNG file and puts it into an array and console in RBG file format.

//This stores every pixel.
const fs = require('fs');
const PNG = require('pngjs').PNG;

let pixelData = [];

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
      }
    }
    console.log(pixelData); // Check your data
  });
