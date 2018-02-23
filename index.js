"use strict"

const fs = require('fs');
const path = require('path');
const async = require('async');
const glob = require('glob');

module.exports.load = function (filePath, cb) {
	var sql = {};
    glob(filePath, function( err, files) {
		async.each( files, function( file, callback) {
            getFileContentsAsJsonObject(file, sql, callback);
		}, function(err ) {
			cb( err, sql );
		});
	});
}


function getFileContentsAsJsonObject (filename, sqlObject, cb ) {
	fs.readFile( filename, "utf8", function( err, data){
		if( err ) return cb( err );
	
		if (typeof data === 'undefined') {
			return cb("sql file missing at path " + filename);
		}
		
		//	Remove linefeeds and carriage returns to make it easier to parse
		data = data.replace(/(?:\r\n|\r|\n)/g, " ");

		var sections = data.split(";");
		for (var i = 0; i < sections.length; i++) {
			var section = sections[i];
			var tagEnd = section.search("\\*\\/");
			var tagStart = section.search("\\/\\*") + 1;
			var queryName = section.substring(tagStart + 1 , tagEnd).trim();
			var sql = section.substring(tagEnd + 3, section.length);
			
			if (queryName.length) {
				//	We consider a duplicate key an error
				if( sqlObject.hasOwnProperty(queryName)) {
					return cb( "Duplicate SQL in '" + filename+ "': '" + queryName + "'");
				}
				sqlObject[queryName] = sql;
			}
		}
		cb( null );
	});
}