//Group 5 
//Kian Petroskie, Marco DeMelo, Ian Haworth
let express = require('express');
let app = express();

app.listen(3000);

app.get("/", (request, response) => {
  response.render('index.ejs');
});