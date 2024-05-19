import { app, ipcMain } from 'electron';
import Logger from 'electron-log/main';
import { $init } from '../config/strings';
import analytics from './analytics';
import appFlags from './app-flags';
import appListeners from './app-listeners';
import { AutoUpdate } from './auto-update';
import { createChildWindow, createMainWindow } from './create-window';
import debugging from './debugging';
import errorHandling from './error-handling';
import kb from './keyboard';
import logger from './logger';
import { setupDockMenu } from './menu';
import protocol from './protocol';
import { resetApp } from './reset';
import sounds from './sounds';
import tray from './tray';
import { debugInfo, is } from './util';
import windows from './windows';
import path from 'path';
import sqlite3 from 'sqlite3';
import { ipcChannels } from '../config/ipc-channels';

// Database initialization
let db: sqlite3.Database;

export const startup = () => {
	console.timeLog(app.name, $init.startup);

	// Initialize logger
	logger.initialize();

	// Initialize analytics
	analytics.initialize();
	analytics.track('app_started');

	// Initialize the error handler
	errorHandling.initialize();

	if (is.debug) {
		// Reset the app and store to default settings
		resetApp();
	}

	// Enable electron debug and source map support
	debugging.initialize();

	// App CLI flags
	appFlags.initialize();

	// Register app listeners, e.g. `app.on()`
	appListeners.register();

	// Initialize the database
	db = new sqlite3.Database(
		path.join(__dirname, '..', 'students.db'),
		sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
		(err) => {
			if (err) {
				console.error('Error when connecting to the database', err);
			} else {
				console.log('Database connection established');
			}
		},
	);

	Logger.status($init.started);
	console.timeLog(app.name, $init.started);
};

export const ready = async () => {
	Logger.status($init.started);
	console.timeLog(app.name, $init.ready);

	// Log Node/Electron versions
	Logger.info(debugInfo());

	if (is.debug) {
		await debugging.installExtensions();
	}

	// Add remaining app listeners
	appListeners.ready();

	// Setup keyboard shortcuts
	kb.registerKeyboardShortcuts();

	// Create the main browser window.
	windows.mainWindow = await createMainWindow();

	// Setup Dock Menu
	setupDockMenu();

	// Setup Tray
	tray.initialize();

	// Register custom protocol like `app://`
	protocol.initialize();

	// Initialize IPC handlers
	ipcMain.handle(ipcChannels.FETCH_STUDENT_DATA, (event) => {
		return new Promise((resolve, reject) => {
			db.all('SELECT * FROM students', (err, rows) => {
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
			});
		});
	});

	ipcMain.handle(ipcChannels.SAVE_STUDENT_DATA, (event, studentData) => {
		return new Promise((resolve, reject) => {
			const { studentId, name, dob, lastAttendedSchool, currentStandard } =
				studentData;
			db.run(
				'INSERT INTO students (studentId, name, dob, lastAttendedSchool, currentStandard) VALUES (?, ?, ?, ?, ?)',
				[studentId, name, dob, lastAttendedSchool, currentStandard],
				(err) => {
					if (err) {
						reject(err);
					} else {
						resolve({ success: true });
					}
				},
			);
		});
	});

	// Auto updates
	// eslint-disable-next-line no-new
	new AutoUpdate();

	// Idle
	Logger.status($init.mainIdle);
	console.timeLog(app.name, $init.mainIdle);
};

export const idle = async () => {
	sounds.play('STARTUP');
	// windows.childWindow = await createChildWindow();

	// ... do something with your app

	Logger.status($init.idle);
	console.timeLog(app.name, $init.idle);
};

// Ensure the ready function is called
app.whenReady().then(ready);
