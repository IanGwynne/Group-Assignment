const mysql = require("./config.js");

function getFromRestaurants()
{
    let query = `SELECT * FROM restaurants`;

    let safeQuery = mysql.functions.format(query)
    return querySql(safeQuery);
}

function getTableInfo(criteria)
{
    let query = `SELECT name, city, country, cuisine FROM restaurants
     ORDER BY name LIMIT ?,?`;

    let checkedFilter = 4 //change value to whichever option is chosen by user (city country or quisine)

   if (checkedFilter==2)
       query = `SELECT name, city, country, cuisine FROM restaurants WHERE country = 'Italy' 
       ORDER BY name LIMIT ?,?`; // change hardcoded value of Italy to what the user chose from 2nd dropbox
   else if (checkedFilter==3)
       query = `SELECT name, city, country, cuisine FROM restaurants WHERE city = 'Santa Rita'
       ORDER BY name LIMIT ?,?`; // change hardcoded value of Santa Rita to what the user chose from 2nd dropbox
   else if (checkedFilter==4)
       query = `SELECT name, city, country, cuisine FROM restaurants WHERE cuisine = 'Italian'
       ORDER BY name LIMIT ?,?`; // change hardcoded value of Italian to what the user chose from 2nd dropbox

    let safeQuery = mysql.functions.format(query, [criteria.skip, criteria.take]);
    return querySql(safeQuery);
}

module.exports = {
    "getFromRestaurants": getFromRestaurants,
    "getTableInfo": getTableInfo
};


/*****************************************************************
 *        You can ignore everything below here!
 *****************************************************************/

// don't worry too much about this function! 
// it has been written to return the data from your database query
// *** it DOES NOT need modifying! ***
function querySql(sql) {
    let con = mysql.getCon();

    con.connect(function(error) {
        if (error) {
          return console.error(error);
        } 
      });

    return new Promise((resolve, reject) => {
        con.query(sql, (error, sqlResult) => {
            if(error) {
                return reject(error);
            }           

            return resolve(sqlResult);
        });

        con.end();
    });
}