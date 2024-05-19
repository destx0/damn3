const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'test-database.sqlite');
const db = new Database(dbPath, { verbose: console.log });

// Create a test table if it doesn't exist
db.exec(`CREATE TABLE IF NOT EXISTS students (
  studentId TEXT PRIMARY KEY,
  name TEXT,
  dob TEXT,
  lastAttendedSchool TEXT,
  currentStandard TEXT
)`);

module.exports = db;
