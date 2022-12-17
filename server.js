//Group 5 
//Kian Petroskie, Marco DeMelo, Ian Haworth
let express = require('express');
const queries = require('./mysql/queries');
let app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.listen(3000);

app.get("/", (request, response) => {
    response.render('index')
});

app.get("/all", (request, response) => {
  let filter = request.query.firstBox;
  if(filter == "none")
  {
    queries.getAllFromRestaurants().then(result => {
      response.json(result);
    })
  }
  else
  {
    console.log(filter);
    queries.getFromRestaurants(
      {
        filter: filter
      }).then(result => {
        response.json(result);
      })
  }
});

app.get("/users", (request, response) => {
    
  let take = parseInt(request.query.take);
  let skip = parseInt(request.query.page) * take;
  let firstFilter = request.query.firstBox;
  let secondFilter = request.query.secondBox;
  
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
        take: take,
        skip: skip
      }).then(tableResult => {
        response.json(tableResult);
      })
  }
});