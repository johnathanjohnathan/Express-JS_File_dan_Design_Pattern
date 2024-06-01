const express = require('express')
const app = express()
const port = 3000
const router = require('./routes')
const morgan = require('morgan')
const path =require('path')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
//app.use(morgan('common'))
app.use("/upload", express.static(path.join(__dirname, "/upload")))
app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})