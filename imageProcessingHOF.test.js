/*--------------------------------------------------*/
//NAME:           Joseph Schneider
//FILE:           imageProcessingHOF.test.ts
//CLASS:          CICS-220 Programming Methodology
//ASSIGNMENT:     image-processing with HOF
//PROFESSOR:      Marius Minea
//DATE STARTED:   09/13/2024
//DATE COMPLETED: 09/18/2024
//DATE DUE:       09/18/2024
/*--------------------------------------------------*/
import assert from "assert";
import { COLORS, Image } from "../include/image.js";
import { imageMapCoord, imageMapIf, mapWindow, isGrayish, makeGrayish, pixelBlur, imageBlur, } from "./imageProcessingHOF.js";
function changeToBlack(img, x, y) {
    img;
    x;
    y;
    return COLORS.BLACK;
}
function createWhiteImage() {
    return Image.create(5, 10, COLORS.WHITE);
}
function createUniqueImage() {
    const testImage = Image.create(3, 4, COLORS.BLACK);
    testImage.setPixel(0, 0, [1, 2, 3]);
    testImage.setPixel(0, 1, [4, 5, 6]);
    testImage.setPixel(0, 2, [7, 8, 9]);
    testImage.setPixel(1, 0, [1, 2, 3]);
    testImage.setPixel(1, 1, [4, 5, 6]);
    testImage.setPixel(1, 2, [7, 8, 9]);
    testImage.setPixel(2, 0, [1, 2, 3]);
    testImage.setPixel(2, 1, [4, 5, 6]);
    testImage.setPixel(2, 2, [7, 8, 9]);
    return testImage;
}
function returnColorBlack(color) {
    color;
    return COLORS.BLACK;
}
function returnFalseWithImgCoord(img, x, y) {
    img;
    x;
    y;
    return false;
}
function returnTrueWithImgCoord(img, x, y) {
    img;
    x;
    y;
    return true;
}
describe("imageMapCoord", () => {
    function identity(img, x, y) {
        return img.getPixel(x, y);
    }
    it("should return a different image", () => {
        const input = Image.create(10, 10, COLORS.WHITE);
        const output = imageMapCoord(input, identity);
        assert(input !== output);
    });
    it("should change the bottom right pixel", () => {
        const testImage = Image.create(5, 10, COLORS.WHITE);
        const output = imageMapCoord(testImage, changeToBlack);
        const p = output.getPixel(4, 9);
        assert(p[0] === 0, "The red channel should be 0.");
        assert(p[1] === 0, "The green channel should be 0.");
        assert(p[2] === 0, "The blue channel should be 0.");
    });
    it("should change the top right pixel", () => {
        const testImage = Image.create(5, 10, COLORS.WHITE);
        const output = imageMapCoord(testImage, changeToBlack);
        const p = output.getPixel(4, 0);
        assert(p[0] === 0, "The red channel should be 0.");
        assert(p[1] === 0, "The green channel should be 0.");
        assert(p[2] === 0, "The blue channel should be 0.");
    });
    it("should change the bottom left pixel", () => {
        const testImage = Image.create(5, 10, COLORS.WHITE);
        const output = imageMapCoord(testImage, changeToBlack);
        const p = output.getPixel(0, 9);
        assert(p[0] === 0, "The red channel should be 0.");
        assert(p[1] === 0, "The green channel should be 0.");
        assert(p[2] === 0, "The blue channel should be 0.");
    });
    it("should change the top left pixel", () => {
        const testImage = Image.create(5, 10, COLORS.WHITE);
        const output = imageMapCoord(testImage, changeToBlack);
        const p = output.getPixel(0, 0);
        assert(p[0] === 0, "The red channel should be 0.");
        assert(p[1] === 0, "The green channel should be 0.");
        assert(p[2] === 0, "The blue channel should be 0.");
    });
    // More tests for imageMapCoord go here.
});
describe("imageMapIf", () => {
    // More tests for imageMapIf go here
    const whiteImage = createWhiteImage();
    const noChangeImage = imageMapIf(whiteImage, returnFalseWithImgCoord, returnColorBlack);
    const yesChangeImage = imageMapIf(whiteImage, returnTrueWithImgCoord, returnColorBlack);
    it("should not change the bottom right pixel", () => {
        const p = noChangeImage.getPixel(4, 9);
        assert(p[0] === 255, "The red channel should be 255.");
        assert(p[1] === 255, "The green channel should be 255.");
        assert(p[2] === 255, "The blue channel should be 255.");
    });
    it("should not change the top right pixel", () => {
        const p = noChangeImage.getPixel(4, 0);
        assert(p[0] === 255, "The red channel should be 255.");
        assert(p[1] === 255, "The green channel should be 255.");
        assert(p[2] === 255, "The blue channel should be 255.");
    });
    it("should not change the bottom left pixel", () => {
        const p = noChangeImage.getPixel(0, 9);
        assert(p[0] === 255, "The red channel should be 255.");
        assert(p[1] === 255, "The green channel should be 255.");
        assert(p[2] === 255, "The blue channel should be 255.");
    });
    it("should not change the top left pixel", () => {
        const p = noChangeImage.getPixel(0, 0);
        assert(p[0] === 255, "The red channel should be 255.");
        assert(p[1] === 255, "The green channel should be 255.");
        assert(p[2] === 255, "The blue channel should be 255.");
    });
    it("should change the bottom right pixel", () => {
        const p = yesChangeImage.getPixel(4, 9);
        assert(p[0] === 0, "The red channel should be 0.");
        assert(p[1] === 0, "The green channel should be 0.");
        assert(p[2] === 0, "The blue channel should be 0.");
    });
    it("should change the top right pixel", () => {
        const p = yesChangeImage.getPixel(4, 0);
        assert(p[0] === 0, "The red channel should be 0.");
        assert(p[1] === 0, "The green channel should be 0.");
        assert(p[2] === 0, "The blue channel should be 0.");
    });
    it("should change the bottom left pixel", () => {
        const p = yesChangeImage.getPixel(0, 9);
        assert(p[0] === 0, "The red channel should be 0.");
        assert(p[1] === 0, "The green channel should be 0.");
        assert(p[2] === 0, "The blue channel should be 0.");
    });
    it("should change the top left pixel", () => {
        const p = yesChangeImage.getPixel(0, 0);
        assert(p[0] === 0, "The red channel should be 0.");
        assert(p[1] === 0, "The green channel should be 0.");
        assert(p[2] === 0, "The blue channel should be 0.");
    });
});
describe("mapWindow", () => {
    // More tests for mapWindow go here
    const whiteImage = createWhiteImage();
    const changedImage2X2 = mapWindow(whiteImage, [0, 1], // Assumed to be a two element array containing [x_min, x_max]
    [0, 1], // Assumed to be a two element array containing [y_min, y_max]
    returnColorBlack);
    const changedImage1X1 = mapWindow(whiteImage, [0, 0], // Assumed to be a two element array containing [x_min, x_max]
    [0, 0], // Assumed to be a two element array containing [y_min, y_max]
    returnColorBlack);
    it("should change the top left 4 pixels", () => {
        const p1 = changedImage2X2.getPixel(0, 0);
        const p2 = changedImage2X2.getPixel(0, 1);
        const p3 = changedImage2X2.getPixel(1, 0);
        const p4 = changedImage2X2.getPixel(1, 1);
        assert(p1[0] === 0, "The red channel should be 0.");
        assert(p1[1] === 0, "The green channel should be 0.");
        assert(p1[2] === 0, "The blue channel should be 0.");
        assert(p2[0] === 0, "The red channel should be 0.");
        assert(p2[1] === 0, "The green channel should be 0.");
        assert(p2[2] === 0, "The blue channel should be 0.");
        assert(p3[0] === 0, "The red channel should be 0.");
        assert(p3[1] === 0, "The green channel should be 0.");
        assert(p3[2] === 0, "The blue channel should be 0.");
        assert(p4[0] === 0, "The red channel should be 0.");
        assert(p4[1] === 0, "The green channel should be 0.");
        assert(p4[2] === 0, "The blue channel should be 0.");
    });
    it("should not change any other pixels", () => {
        const p1 = changedImage2X2.getPixel(0, 2);
        const p2 = changedImage2X2.getPixel(2, 2);
        const p3 = changedImage2X2.getPixel(2, 0);
        assert(p1[0] === 255, "The red channel should be 255.");
        assert(p1[1] === 255, "The green channel should be 255.");
        assert(p1[2] === 255, "The blue channel should be 255.");
        assert(p2[0] === 255, "The red channel should be 255.");
        assert(p2[1] === 255, "The green channel should be 255.");
        assert(p2[2] === 255, "The blue channel should be 255.");
        assert(p3[0] === 255, "The red channel should be 255.");
        assert(p3[1] === 255, "The green channel should be 255.");
        assert(p3[2] === 255, "The blue channel should be 255.");
    });
    it("should work with array [0,0] or an array where both elements are the same", () => {
        const p1 = changedImage1X1.getPixel(0, 0);
        const p2 = changedImage1X1.getPixel(0, 1);
        const p3 = changedImage1X1.getPixel(1, 0);
        const p4 = changedImage1X1.getPixel(1, 1);
        assert(p1[0] === 0, "The red channel should be 0.");
        assert(p1[1] === 0, "The green channel should be 0.");
        assert(p1[2] === 0, "The blue channel should be 0.");
        assert(p2[0] === 255, "The red channel should be 255.");
        assert(p2[1] === 255, "The green channel should be 255.");
        assert(p2[2] === 255, "The blue channel should be 255.");
        assert(p3[0] === 255, "The red channel should be 255.");
        assert(p3[1] === 255, "The green channel should be 255.");
        assert(p3[2] === 255, "The blue channel should be 255.");
        assert(p4[0] === 255, "The red channel should be 255.");
        assert(p4[1] === 255, "The green channel should be 255.");
        assert(p4[2] === 255, "The blue channel should be 255.");
    });
});
describe("isGrayish", () => {
    // More tests for isGrayish go here
    const arr1 = [15, 100, 35];
    const arr2 = [36, 52, 79];
    const arr3 = [10, 10, 10];
    const arr4 = [0, 0, 0];
    const arr5 = [255, 255, 255];
    const arr6 = [5, 255, 100];
    it("should correctly determine the following pixels", () => {
        assert(isGrayish(arr1), "this should be true 100 - 15 <= 85");
        assert(isGrayish(arr2), "this should be true using non pretty numbers");
        assert(isGrayish(arr3), "this should be true all numbers are the same");
        assert(isGrayish(arr4), "this should be true all numbers are same + edge case");
        assert(isGrayish(arr5), "this should be true all numbers are same + edge case");
        assert(!isGrayish(arr6), "this should be false 255-5 > 85");
    });
});
describe("makeGrayish", () => {
    // More tests for makeGrayish go here
    const whitishImage = createWhiteImage();
    const newColor = [5, 255, 37];
    for (let i = 0; i < whitishImage.width; ++i) {
        whitishImage.setPixel(i, 3, newColor);
    }
    const grayImage = makeGrayish(whitishImage);
    const grayValue = Math.floor((newColor[0] + newColor[1] + newColor[2]) / 3);
    it("should correctly change the pixels in the 4th row", () => {
        const p1 = grayImage.getPixel(0, 3);
        const p2 = grayImage.getPixel(whitishImage.width - 1, 3);
        const p3 = grayImage.getPixel(0, 2);
        const p4 = grayImage.getPixel(whitishImage.width - 1, 2);
        const p5 = grayImage.getPixel(0, 4);
        const p6 = grayImage.getPixel(whitishImage.width - 1, 4);
        assert(p1[0] === grayValue && p2[0] === grayValue, "The left most pixel should have changed to a greyish pixel");
        assert(p1[1] === grayValue && p2[1] === grayValue, "The left most pixel should have changed to a greyish pixel");
        assert(p1[2] === grayValue && p2[2] === grayValue, "The left most pixel should have changed to a greyish pixel");
        assert(p3[0] === 255 && p4[0] === 255, "The line above the changed line should remain the same");
        assert(p3[1] === 255 && p4[1] === 255, "The line above the changed line should remain the same");
        assert(p3[2] === 255 && p4[2] === 255, "The line above the changed line should remain the same");
        assert(p5[0] === 255 && p6[0] === 255, "The line below the changed line should remain the same");
        assert(p5[1] === 255 && p6[1] === 255, "The line above the changed line should remain the same");
        assert(p5[2] === 255 && p6[2] === 255, "The line above the changed line should remain the same");
    });
});
describe("pixelBlur", () => {
    // Tests for pixelBlur go here
    const testImage = createUniqueImage();
    const expRedValue = Math.floor(36 / 9);
    const expGreenValue = Math.floor(45 / 9);
    const expBlueValue = Math.floor(54 / 9);
    const blurredColor = pixelBlur(testImage, 1, 1);
    it("Should return the correct pixel value", () => {
        assert(blurredColor[0] === expRedValue, "The red value should equal expected value");
        assert(blurredColor[1] === expGreenValue, "The green value should equal expected value");
        assert(blurredColor[2] === expBlueValue, "The blue value should equal expected value");
    });
});
describe("imageBlur", () => {
    // Tests for imageBlur go here
    const testImage = createUniqueImage();
    const blurredImage = imageBlur(testImage);
    const topLeftColor = blurredImage.getPixel(0, 0);
    const expTopLeftRedVal = Math.floor(10 / 4);
    const expTopLeftGreenVal = Math.floor(14 / 4);
    const expTopLeftBlueVal = Math.floor(18 / 4);
    const topRightColor = blurredImage.getPixel(2, 0);
    const expTopRightRedVal = Math.floor(10 / 4);
    const expTopRightGreenVal = Math.floor(14 / 4);
    const expTopRightBlueVal = Math.floor(18 / 4);
    const bottomLeftColor = blurredImage.getPixel(0, 3);
    const expBotLeftRedVal = Math.floor(14 / 4);
    const expBotLeftGreenVal = Math.floor(16 / 4);
    const expBotLeftBlueVal = Math.floor(18 / 4);
    const bottomRightColor = blurredImage.getPixel(2, 3);
    const expBotRightRedVal = Math.floor(14 / 4);
    const expBotRightGreenVal = Math.floor(16 / 4);
    const expBotRightBlueVal = Math.floor(18 / 4);
    const middleColor = blurredImage.getPixel(1, 1);
    const expMiddleRedVal = Math.floor(36 / 9);
    const expMiddleGreenVal = Math.floor(45 / 9);
    const expMiddleBlueVal = Math.floor(54 / 9);
    it("Should blur the whole image", () => {
        assert(topLeftColor[0] === expTopLeftRedVal, "The red value should equal expected value");
        assert(topLeftColor[1] === expTopLeftGreenVal, "The green value should equal expected value");
        assert(topLeftColor[2] === expTopLeftBlueVal, "The blue value should equal expected value");
        assert(topRightColor[0] === expTopRightRedVal, "The red value should equal expected value");
        assert(topRightColor[1] === expTopRightGreenVal, "The green value should equal expected value");
        assert(topRightColor[2] === expTopRightBlueVal, "The blue value should equal expected value");
        assert(bottomLeftColor[0] === expBotLeftRedVal, "The red value should equal expected value");
        assert(bottomLeftColor[1] === expBotLeftGreenVal, "The green value should equal expected value");
        assert(bottomLeftColor[2] === expBotLeftBlueVal, "The blue value should equal expected value");
        assert(bottomRightColor[0] === expBotRightRedVal, "The red value should equal expected value");
        assert(bottomRightColor[1] === expBotRightGreenVal, "The green value should equal expected value");
        assert(bottomRightColor[2] === expBotRightBlueVal, "The blue value should equal expected value");
        assert(middleColor[0] === expMiddleRedVal, "The red value should equal expected value");
        assert(middleColor[1] === expMiddleGreenVal, "The green value should equal expected value");
        assert(middleColor[2] === expMiddleBlueVal, "The blue value should equal expected value");
    });
});
//# sourceMappingURL=imageProcessingHOF.test.js.map