const mysql = require("./config.js");

function getFromRestaurants()
{
    let query = `SELECT * FROM restaurants `;
    let safeQuery = mysql.functions.format(query)

    return querySql(safeQuery);
}

function getTableInfo(criteria)
{
    let query = `SELECT name, city, country, cuisine FROM restaurants
     ORDER BY street LIMIT ?,?`;
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