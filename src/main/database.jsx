import { ipcMain } from 'electron';
import path from 'path';
import Database from 'better-sqlite3';

// Database setup
const dbPath = path.join(__dirname, 'test-database.sqlite');
const db = new Database(dbPath, { verbose: console.log });

// Create the students table if it doesn't exist
db.exec(`CREATE TABLE IF NOT EXISTS students (
  studentId TEXT PRIMARY KEY,
  aadharNo TEXT,
  name TEXT,
  surname TEXT,
  fathersName TEXT,
  mothersName TEXT,
  religion TEXT,
  caste TEXT,
  subCaste TEXT,
  placeOfBirth TEXT,
  taluka TEXT,
  district TEXT,
  state TEXT,
  dob TEXT,
  lastAttendedSchool TEXT,
  lastSchoolStandard TEXT,
  dateOfAdmission TEXT,
  admissionStandard TEXT,
  progress TEXT,
  conduct TEXT,
  dateOfLeaving TEXT,
  currentStandard TEXT,
  reasonOfLeaving TEXT,
  remarks TEXT
)`);

// IPC handlers
ipcMain.handle('add-student', (event, student) => {
	const {
		studentId,
		aadharNo,
		name,
		surname,
		fathersName,
		mothersName,
		religion,
		caste,
		subCaste,
		placeOfBirth,
		taluka,
		district,
		state,
		dob,
		lastAttendedSchool,
		lastSchoolStandard,
		dateOfAdmission,
		admissionStandard,
		progress,
		conduct,
		dateOfLeaving,
		currentStandard,
		reasonOfLeaving,
		remarks,
	} = student;

	const stmt = db.prepare(`INSERT INTO students (
    studentId, aadharNo, name, surname, fathersName, mothersName, religion, caste, subCaste,
    placeOfBirth, taluka, district, state, dob, lastAttendedSchool, lastSchoolStandard,
    dateOfAdmission, admissionStandard, progress, conduct, dateOfLeaving, currentStandard,
    reasonOfLeaving, remarks
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

	const info = stmt.run(
		studentId,
		aadharNo,
		name,
		surname,
		fathersName,
		mothersName,
		religion,
		caste,
		subCaste,
		placeOfBirth,
		taluka,
		district,
		state,
		dob,
		lastAttendedSchool,
		lastSchoolStandard,
		dateOfAdmission,
		admissionStandard,
		progress,
		conduct,
		dateOfLeaving,
		currentStandard,
		reasonOfLeaving,
		remarks,
	);

	return info.changes > 0;
});

ipcMain.handle('get-students', () => {
	const stmt = db.prepare('SELECT * FROM students');
	return stmt.all();
});
