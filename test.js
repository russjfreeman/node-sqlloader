"use strict"

const sqlLoader = require( "./");
const assert = require( "assert");


/*
//  Typical usage
sqlLoader.load( "./sql/*.sql", function( err, sql) {
    global.g_sql = sql;
})
*/

testWorks();

function testWorks() {
    sqlLoader.load( "./testsql/works.sql", function( err, sql) {
        assert( !err );
        assert( sql.testOne);
        assert( sql.testTwo);

        testDuplicateSQL();
    })
}

function testDuplicateSQL() {
    sqlLoader.load( "./testsql/duplicates.sql", function( err, sql) {
        assert( err );
        testMulti();
    })
}

function testMulti() {
    sqlLoader.load( "./testsql/multi*.sql", function( err, sql) {
        assert( !err );
        assert( sql.multiStatementOne);
        assert( sql.multiStatementTwo);
        assert( sql.multiStatementThree);
        
        console.log( "finished");
        process.exit();
    })
}
