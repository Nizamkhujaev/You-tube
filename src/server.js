const express = require('express')
const app = express()
const path = require('path')
const fileUpload = require('express-fileupload')
const {host, PORT} = require('./config.js')
const modules = require('./modules')

app.use(fileUpload())

app.use(modules)

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'uploads')))

app.listen(PORT, () => console.log('http://' + host + ':' + PORT))