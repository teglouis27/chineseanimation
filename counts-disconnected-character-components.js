//This entire program makes the RGB arrays. Then it finds the number of disconnected componenets.
//A iterative stack structure was required for the CCL to not give a max limit error.

//This stores every pixel.
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
          blackPixels.push([x, y]);
        }
      }
    }

    // Start the CCL process after the pixelData array is fully populated
    console.log(CCL(blackPixels, this.width, this.height));
  });

  function CCL(blackPixels, width, height) {
    let label = 0;
    let labels = Array(height).fill().map(() => Array(width).fill(0));

    for(let [x, y] of blackPixels) {
        if(labels[y][x] > 0) continue; // Skip if this pixel is already labeled.
        label++; // Increment the label for the new connected component.
        floodFill(x, y, label);
    }

    function floodFill(x, y, label) {
        let stack = [[x, y]];
        
        while(stack.length > 0) {
            [x, y] = stack.pop();

            if(x < 0 || y < 0 || x >= width || y >= height) continue;
            if(labels[y][x] > 0 || !blackPixels.find(pixel => pixel[0] === x && pixel[1] === y)) continue;

            labels[y][x] = label;

            stack.push([x+1, y]);
            stack.push([x-1, y]);
            stack.push([x, y+1]);
            stack.push([x, y-1]);
        }
    }

    return label; // The total number of labels (connected components).
}
