import path from 'path'
import {promises as fs} from 'fs'
import Jimp from 'jimp'

/**
 * check if file exist or not
 *
 * @param {string} filePath filepath
 * @return {Promise<boolean>} if file exist or not
 */
export const fileExists = async (filePath : string) : Promise<boolean> => {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * take an image filename without extension and return
 * the absolute path
 *
 * @param {string} filename file name
 * @param {string} imageDirectory image directory
 * @return {Promise<string>} Promise resolved image path
 */
export const getImageFilePath = async (
    filename : string,
    imageDirectory : string,
) : Promise<string> => {
  try {
    const imageDir = imageDirectory
    const files = await fs.readdir(imageDir)

    if (!files) {
      throw new Error('Create folder structure for images => src/assets/full')
    }

    if (files.length === 0) {
      throw new Error('No file in image directory')
    }

    const imageFile = files.find((file) => {
      const fileWithoutExtension = path.parse(file).name
      const extension = path.parse(file).ext.toLowerCase();
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif',
        '.bmp', '.webp', '.tiff', '.svg'];
      return fileWithoutExtension === filename &&
      imageExtensions.includes(extension)
    })

    if (!imageFile) {
      throw new Error('No corresponding file found.')
    }

    return `${imageDir}/${imageFile}`
  } catch (error : unknown) {
    throw error
  }
}

/**
 * Process an image and return the path of that image
 *
 * @param {string} filepath filepath
 * @param {string} outputPath path to output dir
 * @param {number} width desired width
 * @param {number} height desired height
 * @return {Promise<string>} path of the image processed
 */
export const imageProcessing = async (
    filepath : string,
    outputPath : string,
    width: number,
    height: number,
) : Promise<string> => {
  try {
    const output = path.join(outputPath, `resized-${path.basename(filepath)}`)

    // check if there is already a resized version
    const fileExist = await fileExists(output)
    if (fileExist) return output

    const imageBeingProcessed = await Jimp.read(filepath);
    await imageBeingProcessed
        .resize(width ? width : 256, height ? height : 256)
        .writeAsync(output)
    return output
  } catch (error : unknown) {
    throw error
  }
}

/**
 * Process an image and return the path of that image
 *
 * @param {string} filepath filepath
 * @param {string} outputPath path to output dir
 * @return {Promise<string>} path of the image processed
 */
export const compressImage = async (
    filepath : string,
    outputPath : string,
) : Promise<string> => {
  try {
    const output = path.join(outputPath,
        `compressed-${path.basename(filepath)}`)

    // check if there is already a resized version
    const fileExist = await fileExists(output)
    if (fileExist) return output

    const imageBeingProcessed = await Jimp.read(filepath);
    await imageBeingProcessed
        .quality(30)
        .writeAsync(output)
    return output
  } catch (error : unknown) {
    throw error
  }
}
