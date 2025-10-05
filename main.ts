/*--------------------------------------------------*/
//NAME:           Joseph Schneider
//FILE:           main.ts
//CLASS:          CICS-220 Programming Methodology
//ASSIGNMENT:     image-processing with HOF
//PROFESSOR:      Marius Minea
//DATE STARTED:   09/13/2024
//DATE COMPLETED: 09/18/2024
//DATE DUE:       09/18/2024
/*--------------------------------------------------*/
import { Image } from "../include/image.js";
import { imageMapCoord, imageBlur, makeGrayish } from "./imageProcessingHOF.js";
/*
const art = Image.loadImageFromGallery("art");
imageMapCoord(art, (img, x, y) => {
  const c = img.getPixel(x, y);
  if (y % 2 === 0) {
    return [c[0], 0, 0];
  }

  return c;
}).show();
*/
//const newImage = Image.loadImageFromGallery("pencils");
//newImage.show();
//imageBlur(newImage).show();
/*
const newImageTwo = Image.loadImageFromGallery("pencils");
newImageTwo.show();
makeGrayish(newImageTwo).show();
*/
/*
const p = [100, 77, 6];
const sortedP = p.sort((a,b) => a - b);
const b = ((Math.abs(sortedP[2] - sortedP[0])) <= 85);
console.log(sortedP);
console.log(b);
*/
