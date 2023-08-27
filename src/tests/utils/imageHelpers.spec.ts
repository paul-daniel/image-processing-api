import path from 'path'
import { fileExists, getImageFilePath } from '../../utils/imageHelpers'

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

    it('should return absolute file path', async () => {
      await expectAsync(getImageFilePath('', imageDir))
          .toBeRejectedWith(new Error('No file in image directory'))
    })
  })
})
