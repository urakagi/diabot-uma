const { promisify } = require('util');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('sqlite.db');
const query = promisify(db.all).bind(db);

db.run('CREATE TABLE IF NOT EXISTS videos (' +
    '"id" INTEGER PRIMARY KEY AUTOINCREMENT, ' +
    '"keyword" TEXT, ' +
    '"url" TEXT)');
db.run('CREATE TABLE IF NOT EXISTS shortcuts (' +
    '"id" INTEGER PRIMARY KEY AUTOINCREMENT, ' +
    '"word" TEXT, ' +
    '"content" TEXT)');
db.run('CREATE TABLE IF NOT EXISTS gametora (' +
    '"page" TEXT PRIMARY KEY ON CONFLICT REPLACE, ' +
    '"url" TEXT)');

module.exports = { db, query };
