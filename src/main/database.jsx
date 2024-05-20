import { ipcMain } from 'electron';
import path from 'path';
import Database from 'better-sqlite3';
import { ipcChannels } from '../config/ipc-channels'; // Make sure to import ipcChannels correctly

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

ipcMain.handle(ipcChannels.SAVE_STUDENT_DATA, (event, student) => {
	try {
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

		return { success: info.changes > 0 };
	} catch (error) {
		console.error('Error saving student data:', error);
		return { success: false, error: error.message };
	}
});

ipcMain.handle(ipcChannels.FETCH_STUDENT_DATA, (event, page, pageSize) => {
	try {
		const offset = (page - 1) * pageSize;
		const stmt = db.prepare('SELECT * FROM students LIMIT ? OFFSET ?');
		const students = stmt.all(pageSize, offset);
		return { success: true, data: students };
	} catch (error) {
		console.error('Error fetching student data:', error);
		return { success: false, error: error.message };
	}
});
