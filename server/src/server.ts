import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'


import routersPublic from "./app/routers/public"
import routersUser from "./app/routers/user"

import constants from './constants'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(bodyParser.json({ limit: '999999999mb' }))
app.use(bodyParser.urlencoded({ limit: '9999999mb', extended: true }))

app.use(cookieParser())

app.use('/api', routersPublic)
app.use('/api', routersUser)

if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.join(__dirname, '../client/dist')))
  app.get('*', (req, res) => {
    try {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'))
    } catch (e) {
      console.log(e)
    }
  })
}

app.listen(PORT, () => {
  console.log('-------> Servidor rodando na porta ' + PORT)
})

const urlMongoConnection =
  process.env.NODE_ENV === constants.development
    ? process.env.MONGO_CONNECTION_URL_DEVELOPMENT
    : process.env.MONGO_CONNECTION_URL_PRODUCTION

mongoose
  .connect(urlMongoConnection || '')
  .then(() => console.log('-------> Banco de dados rodando!'))
  .catch((error) => console.log(error))
