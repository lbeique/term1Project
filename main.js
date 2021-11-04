/*
 * Project: COMP1320 Milestone 1
 * File Name: main.js
 * Description: Unzips PNGs, alters pixels and filters to grayscale, repackages PNGs
 * 
 * Created Date: Nov 4
 * Author: Laurent Beique
 * 
 */

const IOhandler = require("./IOhandler"),
  zipFilePath = `${__dirname}/myfile.zip`,
  pathUnzipped = `${__dirname}/unzipped`,
  pathProcessed = `${__dirname}/grayscaled`;


// Start read stream
// unzip/extract files
// read png files
// copy png to a secondary stream that writes unfiltered pictures in final location
// unpack first stream png
// cycle through pixel (objects or arrays)
// change values of pixels
// repackage png
// write stream to final location