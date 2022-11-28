const mysql = require('mysql');

module.exports = {
  getCon: () => mysql.createConnection({
    host: "localhost",
    user: "youruser",
    password: "yourpassword",
    database: "restaurants"
  }),
  functions: mysql
};