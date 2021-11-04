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


