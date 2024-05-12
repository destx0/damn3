const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(
	'./mydatabase.db',
	sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
	(err) => {
		if (err) {
			console.error('Error when connecting to the database', err);
		} else {
			console.log('Database connection established');
			db.run(
				'CREATE TABLE IF NOT EXISTS dummyData (id INTEGER PRIMARY KEY AUTOINCREMENT, info TEXT)',
			);
		}
	},
);

module.exports = db;
