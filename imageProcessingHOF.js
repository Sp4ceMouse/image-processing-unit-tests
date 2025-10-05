export function imageMapCoord(img, func) {
    // TODO
    const newImage = img.copy();
    //this loop runs through the whole image passed and
    //applys the function to each pixel in the image
    for (let x = 0; x < newImage.width; ++x) {
        for (let y = 0; y < newImage.height; ++y) {
            newImage.setPixel(x, y, func(img, x, y));
        } //end inner for
    } //end outer for
    return newImage;
} //imageMapCoord
export function imageMapIf(img, cond, func) {
    // TODO
    //This is a helper function determines wether or not
    //to apply the function to the pixel
    function changeColorYesNo(img, x, y) {
        if (cond(img, x, y)) {
            return func(img.getPixel(x, y));
        }
        else {
            return img.getPixel(x, y);
        }
    }
    return imageMapCoord(img, changeColorYesNo);
} //imageMapCoord
export function mapWindow(img, xInterval, // Assumed to be a two element array containing [x_min, x_max]
yInterval, // Assumed to be a two element array containing [y_min, y_max]
func) {
    // TODO
    //this is a helper function that determines if the passed pixel
    //is within the window that we want to map to
    function isWithinBounds(img, x, y) {
        return x >= xInterval[0] && x <= xInterval[1] && y >= yInterval[0] && y <= yInterval[1];
    }
    return imageMapIf(img, isWithinBounds, func);
} //mapWindow
export function isGrayish(p) {
    // TODO
    //if we sort the array we assume that the value at [0] is the
    //smallest value and the value at [1] is the highest
    //we can the check if the difference between the two is less than
    //or equal to 85
    const sortedPixel = p.sort((a, b) => a - b);
    return Math.abs(sortedPixel[2] - sortedPixel[1]) <= 85;
} //isGrayish
export function makeGrayish(img) {
    // TODO
    //helper function from homework #1 that I made
    function flipPixelArray(color) {
        //declaring new empty color to store modified RGB values
        const newColor = [0, 0, 0];
        //storing new color RGB values based on average of other
        //values in the pixel array
        const newPixelValue = Math.floor((color[0] + color[1] + color[2]) / 3);
        newColor[0] = newPixelValue;
        newColor[1] = newPixelValue;
        newColor[2] = newPixelValue;
        return newColor;
    } //end flipPixelArray
    //This is a helper function that determines if the pixel is grayish
    //if it is grayish the function returns false since we dont want to
    //change the pixel, if the pixel is not grayish !isGrayish() then
    //we want to change it and the function returns true
    function checkIfNotGray(img, x, y) {
        return !isGrayish(img.getPixel(x, y));
    }
    return imageMapIf(img, checkIfNotGray, flipPixelArray);
} //makeGrayish
export function pixelBlur(img, x, y) {
    // TODO
    const colorArray = [];
    //This for loop parses through the whole image passed to the function
    //we want to push pixels into our new array if they are withing the bounds
    //of our blur radius, which right now is 1
    for (let i = x - 1; i <= x + 1; ++i) {
        if (i >= 0 && i < img.width) {
            for (let j = y - 1; j <= y + 1; ++j) {
                if (j >= 0 && j < img.height) {
                    colorArray.push(img.getPixel(i, j));
                }
            }
        }
    }
    //This is the finalColor that we want our pixel to equal
    const finalColor = [0, 0, 0];
    //our colorArray consists of all the pixels we need to average
    //so we add up each R, G, B component separately then send those
    //values to our final pixel
    for (let i = 0; i < colorArray.length; ++i) {
        finalColor[0] += colorArray[i][0];
        finalColor[1] += colorArray[i][1];
        finalColor[2] += colorArray[i][2];
    }
    //we want the average for each channel so we need to make sure
    //we divide by array length which is the total number of pixels
    //used to calculate the new value
    return finalColor.map(x => Math.floor(x / colorArray.length));
} //pixelBlur
export function imageBlur(img) {
    // TODO
    return imageMapCoord(img, pixelBlur);
} //imageBlur
//# sourceMappingURL=imageProcessingHOF.js.map