import { app } from 'electron';
import Logger from 'electron-log';
import { APP_MESSAGES_MAX } from '../config/config';
import { ipcChannels } from '../config/ipc-channels';
import { SettingsType } from '../config/settings';
import { $messages } from '../config/strings';
import store, { AppMessageType } from './store';
import tray from './tray';
import { forEachWindow } from './utils/window-utils';

const synchronizeApp = (changedSettings?: Partial<SettingsType>) => {
	// Sync with main
	if (changedSettings) {
		const keys = Object.keys(changedSettings);

		if (keys.includes('showDockIcon')) {
			app.dock[changedSettings.showDockIcon ? 'show' : 'hide']();
		}

		if (keys.includes('showTrayIcon')) {
			if (changedSettings.showTrayIcon) {
				tray.initialize();
			} else {
				tray.destroy();
			}
		}
	}

	// Sync with renderer
	forEachWindow((win) => {
		win.webContents.send(ipcChannels.APP_UPDATED);
	});
};

export const resetStoreSettings = () => {
	Logger.status($messages.resetStore);
	store.delete('settings');
	store.delete('keybinds');

	synchronizeApp();
};

export const resetStore = () => {
	Logger.status($messages.resetStore);
	store.clear();

	synchronizeApp();
};

export const getKeybinds = () => {
	return store.get('keybinds');
};

export const getSetting = (setting: keyof SettingsType) => {
	const settings = store.get('settings');
	if (settings[setting] !== undefined) {
		return settings[setting];
	}
};

export const getSettings = () => {
	return store.get('settings');
};

export const setSettings = (settings: Partial<SettingsType>) => {
	store.set('settings', {
		...getSettings(),
		...settings,
	});

	// Sync with renderer
	synchronizeApp(settings);
};

export const addAppMessage = (message: AppMessageType) => {
	let appMessageLog = store.get('appMessageLog');
	if (appMessageLog.length > APP_MESSAGES_MAX) {
		appMessageLog = appMessageLog.slice(0, Math.ceil(APP_MESSAGES_MAX / 2));
	}
	appMessageLog.push(message);
	store.set('appMessageLog', appMessageLog);

	// Sync with renderer
	synchronizeApp();
};

export const getAppMessages = () => {
	const messages = store.get('appMessageLog');

	// Reverse the messages so that the most recent is at the top
	const reversed = messages.slice().reverse();
	return reversed;
};
