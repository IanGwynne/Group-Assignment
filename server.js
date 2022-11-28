
let express = require('express');
let app = express();

app.listen(3000);

app.get("/", (request, response) => {
  response.send("Update to use a view!");
});