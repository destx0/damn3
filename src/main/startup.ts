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

export const startup = () => {
	console.timeLog(app.name, $init.startup);
	logger.initialize();
	analytics.initialize();
	analytics.track('app_started');
	errorHandling.initialize();
	if (is.debug) resetApp();
	debugging.initialize();
	appFlags.initialize();
	appListeners.register();
	Logger.status($init.started);
	console.timeLog(app.name, $init.started);
};

export const ready = async () => {
	Logger.status($init.started);
	console.timeLog(app.name, $init.ready);
	Logger.info(debugInfo());
	if (is.debug) await debugging.installExtensions();
	appListeners.ready();
	kb.registerKeyboardShortcuts();
	windows.mainWindow = await createMainWindow();
	setupDockMenu();
	tray.initialize();
	protocol.initialize();
	new AutoUpdate();
	Logger.status($init.mainIdle);
	console.timeLog(app.name, $init.mainIdle);
};

export const idle = async () => {
	sounds.play('STARTUP');
	Logger.status($init.idle);
	console.timeLog(app.name, $init.idle);
};
