import { ipcMain } from 'electron';
import path from 'path';
import Database from 'better-sqlite3';

// Database setup
const dbPath = path.join(__dirname, 'test-database.sqlite');
const db = new Database(dbPath, { verbose: console.log });

// Create the students table if it doesn't exist
db.exec(`CREATE TABLE IF NOT EXISTS students (
  studentId TEXT PRIMARY KEY,
  name TEXT,
  dob TEXT,
  lastAttendedSchool TEXT,
  currentStandard TEXT
)`);

// IPC handlers
ipcMain.handle('add-student', (event, student) => {
	const { studentId, name, dob, lastAttendedSchool, currentStandard } = student;
	const stmt =
		db.prepare(`INSERT INTO students (studentId, name, dob, lastAttendedSchool, currentStandard)
                           VALUES (?, ?, ?, ?, ?)`);
	const info = stmt.run(
		studentId,
		name,
		dob,
		lastAttendedSchool,
		currentStandard,
	);
	return info.changes > 0;
});

ipcMain.handle('get-students', () => {
	const stmt = db.prepare('SELECT * FROM students');
	return stmt.all();
});
