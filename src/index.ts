import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

import routes from './routes/index'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(morgan('dev'))
app.use('/api', routes)

app.get('/', (req, res) => {
  res.redirect('/api')
})

app.listen(port, () => {
  console.log(`Server listening on port localhost:${port}`)
})

