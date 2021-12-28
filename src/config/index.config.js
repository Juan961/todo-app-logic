require('dotenv').config()

const config = {
  DB_HOST: process.env.DB_HOST, 
  DB_USER: process.env.DB_USER, 
  DB_DATABASE: process.env.DB_DATABASE, 
  DB_PASSWORD: process.env.DB_PASSWORD
}

module.exports = config