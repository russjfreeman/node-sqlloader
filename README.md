# sqlloader
A handy node module to get SQL out of your code and into .sql files.


#Typical usage

``` Javascript
const sqlLoader = require( "sqlloader");

sqlLoader.load( "./sql/*.sql", function( err, sql) {
    global.g_sql = sql;
})

db.query( g_sql.getUsers, function... );

```

#SQL File Format
Basically a SQL statement starts with a C-style comment with the name of the statement, following by the statement, and ending with a semicolon.

A nice benefit of this is that the SQL can be pasted into your favourite SQL editor (SQLYog) without any changes.

``` SQL
/*testOne*/
Select firstname from user where id=1;

/*testTwo*/
Select firstname
from user
inner join hobbies on hobbies.userID = user.id
where id=1
;
```


Enjoy!
