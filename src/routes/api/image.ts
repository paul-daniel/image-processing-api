import express from 'express'
import { getImageFilePath, imageProcessing } from '../../utils/imageHelpers'
import path from 'path'

const image = express.Router()

image.get('/', async (req:express.Request, res:express.Response) => {
  try {
    const {filename} = req.query
    if (!filename) {
      throw new Error('no filename provided')
    }
    const imageDir = path.join(__dirname, '../../assets/full')
    const input = await getImageFilePath(filename as string, imageDir)
    res.status(200).sendFile(input)
  } catch (error : unknown) {
    res.status(500).send((error as Error).message)
  }
})

image.get('/process', async (req: express.Request, res: express.Response) => {
  try {
    const {filename, width, height} = req.query

    if (!filename) {
      throw new Error('no filename provided')
    }

    if (!width || !height) {
      throw new Error('no width or height provided')
    }
    const desiredWidth = Number(width)
    const desiredHeight = Number(height)
    const imageDir = path.join(__dirname, '../../assets/full')
    const outputDir = path.join(__dirname, '../../assets/thumb')
    const input = await getImageFilePath(filename as string, imageDir);
    const processed = await imageProcessing(input,
        outputDir, desiredWidth, desiredHeight)

    res.status(200).sendFile(processed)
  } catch (error) {
    res.status(500).send((error as Error).message)
  }
})

export default image;
