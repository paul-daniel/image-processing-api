import express from 'express'
import image from './api/image'

const routes = express.Router()

routes.get('/', (req : express.Request, res: express.Response) => {
  res.status(200).send('main api route')
})

routes.use('/image', image)

export default routes
