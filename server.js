//Group 5 
//Kian Petroskie, Marco DeMelo, Ian Haworth
let express = require('express');
const { getCon } = require('./mysql/config');
let app = express();
const mysql = require('mysql');
app.listen(3000);

app.get("/", (request, response) => {
 let con= getCon();

 con.connect();
  let query 
  = `SELECT * FROM restaurants `;
  let take = parseInt(request.query.take);
    let skip = parseInt(request.query.page) * take;

//‘${request.query.filter}’` Maybe?
  let safeQuery = mysql.format(query);

  con.query(safeQuery, (error, result) => {
      response.render('index.ejs',
      {
          result:result
      });
  });
   
  con.end();
});