import path from 'path'
import Jimp from 'jimp'
import {promises as fs} from 'fs'
import {
  compressImage,
  fileExists,
  getImageFilePath,
  imageProcessing } from '../../utils/imageHelpers'

describe('test image file helpers', () => {
  describe('test file exist case', () => {
    const fullTrueImagePath = path.join(__dirname, '../assets/full/lake.jpg')
    const fullFalseImagePath = path.join(__dirname, '../assets/thumb/lake.jpg')

    it('should return true if file exist', async () => {
      const fileExist = await fileExists(fullTrueImagePath)
      expect(fileExist).toBe(true)
    })

    it('should return false if file does not exist', async () => {
      const fileExist = await fileExists(fullFalseImagePath)
      expect(fileExist).toBe(false)
    })
  })

  describe('test get image file path', () => {
    const filename = 'lake';
    const imageDir = path.join(__dirname, '../assets/full')
    // const outputDir = path.join(__dirname, '../assets/thumb')

    it('should return absolute file path', async () => {
      const input = await getImageFilePath(filename as string, imageDir)
      expect(input).toContain('lake.jpg')
    })

    it('should reject when file path is empty', async () => {
      await expectAsync(getImageFilePath('', imageDir))
          .toBeRejectedWith(new Error('No corresponding file found.'))
    })

    it('should reject when file path does not exist', async () => {
      await expectAsync(getImageFilePath('lak', imageDir))
          .toBeRejected()
    })
  })

  describe('test image resize', () => {
    const filename = 'lake';
    const imageDir = path.join(__dirname, '../assets/full')
    const outputDir = path.join(__dirname, '../assets/thumb')
    const width = 256
    const height = 256

    afterAll(async () => {
      await fs.rm(outputDir, {recursive: true})
    })

    it('should return processed image absolute path', async () => {
      const filepath = await getImageFilePath(filename, imageDir)
      const expectedOutput = path.join(outputDir,
          `resized-${path.basename(filepath)}` )
      const output = await imageProcessing(filepath, outputDir, width, height)
      expect(output).toEqual(expectedOutput)
    })

    it('should return processed image with 256x256', async () => {
      const filepath = await getImageFilePath(filename, imageDir)
      const output = await imageProcessing(filepath, outputDir, width, height)
      const image = await Jimp.read(output)
      expect(image.bitmap.width).toEqual(256)
      expect(image.bitmap.height).toEqual(256)
    })
  })

  describe('test image compress', () => {
    const filename = 'lake';
    const imageDir = path.join(__dirname, '../assets/full')
    const outputDir = path.join(__dirname, '../assets/thumb')

    afterAll(async () => {
      await fs.rm(outputDir, {recursive: true})
    })

    it('should return processed image absolute path', async () => {
      const filepath = await getImageFilePath(filename, imageDir)
      const expectedOutput = path.join(outputDir,
          `compressed-${path.basename(filepath)}` )
      const output = await compressImage(filepath, outputDir)
      expect(output).toEqual(expectedOutput)
    })
  })
})
