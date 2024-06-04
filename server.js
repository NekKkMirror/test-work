const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('node:path')
const fileUploader = require('express-fileupload')

dotenv.config(path.join(__dirname, '.env'))

const db = require('./app/models')
const cookieParser = require('cookie-parser')

const app = express()
const corsOptions = {
  origin: '*',
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(fileUploader())

db.sequelize.sync()

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to bezkoder application.' })
})

require('./app/routes/auth.routes')(app)
require('./app/routes/user.routes')(app)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
