import {
	BrowserWindow,
	BrowserWindowConstructorOptions,
	app,
	shell,
	ipcMain,
} from 'electron';
import Logger from 'electron-log';
import path from 'path';
import { APP_FRAME, APP_HEIGHT, APP_WIDTH } from '../config/config';
import { setupContextMenu } from './context-menu';
import MenuBuilder from './menu';
import { __resources } from './paths';
import { getSetting } from './store-actions';
import { is, resolveHtmlPath } from './util';
import windows from './windows';
import createPDF from './createPDF';

const getAssetPath = (...paths) => {
	return path.join(__resources, ...paths);
};

function setupPDFGeneration() {
	ipcMain.on('generate-pdf', async (event, studentData) => {
		console.log(
			'Received generate PDF request with student data:',
			studentData,
		);
		const outputPath = path.join(app.getPath('desktop'), 'student_info.pdf');
		try {
			await createPDF(studentData, outputPath);
			console.log('PDF generated successfully');
			event.reply('pdf-generated', 'PDF Generated Successfully!');
		} catch (error) {
			console.error('Failed to generate PDF:', error);
			Logger.error('Failed to generate PDF', error);
			event.reply('pdf-generation-failed', 'Failed to generate PDF');
		}
	});
}

const createWindow = (opts) => {
	const options: BrowserWindowConstructorOptions = {
		title: app.name,
		tabbingIdentifier: app.name,
		frame: APP_FRAME,
		show: false,
		closable: true,
		maximizable: true,
		resizable: true,
		backgroundColor: '#ffffff',
		vibrancy: 'under-window',
		useContentSize: true,
		width: APP_WIDTH,
		minWidth: 550,
		height: APP_HEIGHT,
		minHeight: 420,
		fullscreen: true,
		...(is.linux ? { icon: getAssetPath('icon.png') } : {}),
		...opts,
		webPreferences: {
			preload: app.isPackaged
				? path.join(__dirname, 'preload.js')
				: path.join(__dirname, '../../.erb/dll/preload.js'),
			contextIsolation: true,
			enableRemoteModule: false,
			nodeIntegration: false,
		},
	};

	const browserWindow = new BrowserWindow(options);

	// Event listeners for the browser window
	setupEventListeners(browserWindow);

	// Create application menu
	const menuBuilder = new MenuBuilder(browserWindow);
	menuBuilder.buildMenu();

	// Context menu
	setupContextMenu(browserWindow);

	return browserWindow;
};

function setupEventListeners(window) {
	window.on('unresponsive', (event) => {
		Logger.error(`Window unresponsive: ${event.sender}`);
	});

	window.webContents.on('did-fail-load', (event) => {
		Logger.error(`Window failed load: ${event?.sender}`);
	});

	window.webContents.on('did-finish-load', () => {
		Logger.info('Window finished load');
	});

	window.on('closed', () => {
		Logger.status('Window closed');
	});

	window.webContents.setWindowOpenHandler((data) => {
		shell.openExternal(data.url);
		return { action: 'deny' };
	});
}

export const createMainWindow = async () => {
	const window = createWindow({
		show: false,
		titleBarStyle: 'hiddenInset',
		titleBarOverlay: true,
		trafficLightPosition: { x: 10, y: 9 },
		transparent: true,
		resizable: true,
		maximizable: true,
		width: APP_WIDTH,
		minWidth: 550,
		height: APP_HEIGHT,
		minHeight: 420,
		fullscreen: true,
	});

	window.on('ready-to-show', () => {
		if (process.env.START_MINIMIZED || getSetting('startMinimized')) {
			window.minimize();
		} else {
			window.show();
		}
	});

	window.loadURL(resolveHtmlPath('index.html'));
	setupPDFGeneration();
	return window;
};

export const createChildWindow = async () => {
	const window = createWindow({
		frame: true,
		resizable: true,
		maximizable: true,
	});

	window.on('ready-to-show', () => {
		window.show();
		windows.mainWindow?.focus();
	});

	window.loadURL(resolveHtmlPath('child.html'));

	return window;
};
