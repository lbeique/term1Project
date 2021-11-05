/*
 * Project: COMP1320 Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 * 
 * Created Date: November 4, 2021
 * Author: Laurent Beique
 * 
 */

const unzipper = require('unzipper'),
  fs = require('fs').promises,
  { createReadStream, createWriteStream } = require("fs"),
  PNG = require('pngjs').PNG,
  pipeline = require('stream'),
  path = require('path');

const myFile = path.join(__dirname, 'myfile.zip');
const unzipped = path.join(__dirname, 'unzipped');
const grayscaled = path.join(__dirname, 'grayscaled');


/**
 * Description: decompress file from given pathIn, write to given pathOut 
 *  
 * @param {string} pathIn 
 * @param {string} pathOut 
 * @return {promise}
 */

const unzip = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    createReadStream(pathIn)
      .pipe(unzipper.Extract({ path: pathOut }))
      .on('entry', entry => entry.autodrain())
      .promise()
      // .then(() => console.log("Extraction operation complete"))
      .then(() => resolve(console.log("Extraction operation complete")))
      .catch((err) => reject(err));
  });
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path 
 * 
 * @param {string} path 
 * @return {promise}
 */

const readDir = dir => {
  return new Promise((resolve, reject) => {
    let pngArray = [];
    fs.readdir(dir, 'utf8')
      .then(filesInsideDirectory => {
        filesInsideDirectory.forEach(file => {
          if (path.extname(file) === '.png') {
            pngArray.push(`${unzipped}/${file}`);
          }
        });
      })
      .then(() => resolve(pngArray))
      .catch(err => reject(err));
  });
};

/**
 * Description: Read in png file by given pathIn, 
 * convert to grayscale and write to given pathOut
 * 
 * @param {string} filePath 
 * @param {string} pathProcessed 
 * @return {promise}
 */

const grayScale = function (pathIn, pathOut) {
  return new Promise(function (resolve, reject) {
    pathIn.forEach(function (png) {
      createReadStream(png)
        .pipe(new PNG())
        .on("parsed", function () {
          for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
              let idx = (this.width * y + x) << 2;

              // grayscale color
              const grayscale = (this.data[idx] * 0.3) + (this.data[idx + 1] * 0.59) + (this.data[idx + 2] * 0.1);
              this.data[idx] = grayscale;
              this.data[idx + 1] = grayscale;
              this.data[idx + 2] = grayscale;
            }
          }
          this.pack().pipe(createWriteStream(`${pathOut}/${Math.random().toString(36).slice(-8)}.png`));
        })
    });
    resolve()
    reject(err);
  });
};

const grayScalePromise = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(grayscaled, { recursive: true })
      .then(() => grayScale(pathIn, pathOut))
      .then(() => resolve())
      .catch(err => reject('err'));
  });
};

module.exports = {
  unzip,
  readDir,
  grayScalePromise
};