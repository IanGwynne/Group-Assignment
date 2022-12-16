//Group 5 
//Kian Petroskie, Marco DeMelo, Ian Haworth
let express = require('express');
const queries = require('./mysql/queries');
let app = express();
app.set('view engine', 'ejs');
app.listen(3000);

app.get("/", (request, response) => {
  queries.getFromRestaurants().then(result => {
    response.render('index', {result:result})
  })
});

app.get("/users", (request, response) => {
    
  let take = parseInt(request.query.take);
  let skip = parseInt(request.query.page) * take;
  queries.getTableInfo(
    {
      take: take,
      skip: skip
    }).then(tableResult => {
        response.json(tableResult);
    })
});