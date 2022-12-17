//Group 5 
//Kian Petroskie, Marco DeMelo, Ian Haworth
let express = require('express');
const queries = require('./mysql/queries');
let app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.listen(3000);

app.get("/", (request, response) => {
  //queries.getFromRestaurants().then(result => {
    response.render('index')
  //})
});

app.get("/all", (request, response) => {
  queries.getFromRestaurants().then(result => {
    response.json(result);
  })
});

app.get("/users", (request, response) => {
    
  let take = parseInt(request.query.take);
  let skip = parseInt(request.query.page) * take;
  let firstFilter = request.query.firstBox;
  let secondFilter = request.query.secondBox;
  console.log(secondFilter);
  if(firstFilter != "none")
  {
    queries.getTableInfoFiltered(
      {
        take: take,
        skip: skip,
        firstFilter: firstFilter,
        secondFilter: secondFilter
      }).then(tableResult => {
        response.json(tableResult);
      })

  } 
  else
  {
    queries.getTableInfo(
      {
        take: 2,
        skip: skip
      }).then(tableResult => {
        response.json(tableResult);
      })
  }
});