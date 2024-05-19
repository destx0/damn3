const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(
	path.join(__dirname, 'students.db'), // Use path.join for cross-platform compatibility
	sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
	(err) => {
		if (err) {
			console.error('Error when connecting to the database', err);
		} else {
			console.log('Database connection established');
			db.run(
				'CREATE TABLE IF NOT EXISTS students (studentId TEXT PRIMARY KEY, name TEXT, dob TEXT, lastAttendedSchool TEXT, currentStandard TEXT)',
			);
		}
	},
);

function getAllStudents(callback) {
	db.all('SELECT * FROM students', (err, rows) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, rows);
		}
	});
}

module.exports = { db, getAllStudents };
