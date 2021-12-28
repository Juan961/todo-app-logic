const mysql = require('mysql')
const { DB_HOST, DB_USER, DB_DATABASE, DB_PASSWORD } = require('../config/index.config')

const pool = mysql.createPool({
  host     : DB_HOST,
  user     : DB_USER,
  database : DB_DATABASE,
  password : DB_PASSWORD
});

module.exports = pool