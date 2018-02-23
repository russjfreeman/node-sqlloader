# sqlloader
A handy node module to get SQL out of your code and into .sql files.


Typical usage

``` Javascript
const sqlLoader = require( "sqlloader");

sqlLoader.load( "./sql/*.sql", function( err, sql) {
    global.g_sql = sql;
})

db.query( g_sql.getUsers, function... );

```

Enjoy!