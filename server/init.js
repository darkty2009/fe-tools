var path = require('path');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(path.resolve(__dirname, './database/tools.sqlite3'));

db.serialize(function() {
    // db.run('DROP TABLE IF EXISTS events');
    // db.run('CREATE TABLE events(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(16) NOT NULL, title VARCHAR(255) NOT NULL, start_time VARCHAR(13), end_time VARCHAR(13), status VARCHAR(32) NOT NULL, remark TEXT)');
    // db.run('DROP TABLE IF EXISTS ppts');
    // db.run('CREATE TABLE ppts(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(32) NOT NULL, director VARCHAR(16), upload INTEGER DEFAULT 0)')

	db.run('CREATE TABLE build(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, time VARCHAR(13))');
	db.run('DROP TABLE IF EXISTS layout');
    db.run('CREATE TABLE layout(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title VARCHAR(32) NOT NULL, content TEXT)');});
