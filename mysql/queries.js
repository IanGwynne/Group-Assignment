const mysql = require("./config.js");


function getAllFromRestaurants()
{
    let query = `SELECT DISTINCT * FROM restaurants`;

    let safeQuery = mysql.functions.format(query);
    return querySql(safeQuery);
}

function getFromRestaurants(criteria)
{
    let query = `SELECT DISTINCT cuisine FROM restaurants ORDER BY cuisine`;
    if(criteria.filter == 'City') 
    query = `SELECT DISTINCT city FROM restaurants ORDER BY city`;
    else if(criteria.filter == 'Country')
    query = `SELECT DISTINCT country FROM restaurants ORDER BY country`;

    let safeQuery = mysql.functions.format(query);
    return querySql(safeQuery);
}

function getTableInfo(criteria)
{
    let query = `SELECT DISTINCT name, city, country, cuisine FROM restaurants
     ORDER BY name LIMIT ?,?`;
    let safeQuery = mysql.functions.format(query, [criteria.skip, criteria.take]);
    return querySql(safeQuery);
}

function getTableInfoFiltered(criteria)
{
    let query = `SELECT DISTINCT name, city, country, cuisine FROM restaurants
     WHERE cuisine = ? OR city = ? OR country = ?
     ORDER BY name LIMIT ?,?`;
    let safeQuery = mysql.functions.format(query, [criteria.secondFilter, criteria.secondFilter, criteria.secondFilter,criteria.skip, criteria.take]);
    return querySql(safeQuery);
}

module.exports = {
    getAllFromRestaurants: getAllFromRestaurants,
    getFromRestaurants: getFromRestaurants,
    getTableInfo: getTableInfo,
    getTableInfoFiltered: getTableInfoFiltered
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