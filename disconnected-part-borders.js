//This entire program makes the RGB arrays. Then it finds the coordinates of the disconnected components.
//A iterative stack structure was required for the CCL to not give a max limit error.
//The function flood fill is changed to only include the black pixels that have at least 1 white neighboring pixel.
/*NOTE: Even though the characters do not have 'holes', 
it is abstractly perfect data, the concave hull is the same as the bordering points because of previous comment about floodfill.
*/

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
    let components = []; // This will hold the separate components

    for(let [x, y] of blackPixels) {
        if(labels[y][x] > 0) continue; // Skip if this pixel is already labeled.
        label++; // Increment the label for the new connected component.
        components.push(floodFill(x, y, label)); // Store each component separately
    }

    function floodFill(x, y, label) {
        let stack = [[x, y]];
        let component = []; // This will hold the pixels for the current component
    
        // Function to check if a pixel is within image bounds and is black
        function isBlack(x, y) {
            return x >= 0 && y >= 0 && x < width && y < height && blackPixels.find(pixel => pixel[0] === x && pixel[1] === y);
        }
    
        while(stack.length > 0) {
            [x, y] = stack.pop();
    
            if(x < 0 || y < 0 || x >= width || y >= height) continue;
            if(labels[y][x] > 0 || !isBlack(x, y)) continue;
    
            labels[y][x] = label;
    
            // Check if the pixel is on the border (has at least one non-black neighbour)
            if (!isBlack(x+1, y) || !isBlack(x-1, y) || !isBlack(x, y+1) || !isBlack(x, y-1)) {
                component.push([x, y]); // Add the pixel to the current component
            }
    
            stack.push([x+1, y]);
            stack.push([x-1, y]);
            stack.push([x, y+1]);
            stack.push([x, y-1]);
        }
    
        return component; // Return the current component
    }

    return components; // Return all the components
}
