import { Menu, app, ipcMain, shell } from 'electron';
import { ipcChannels } from '../config/ipc-channels';
import { SettingsType } from '../config/settings';
import { CustomAcceleratorsType } from '../types/keyboard';
import { getOS } from '../utils/getOS';
import kb from './keyboard';
import { notification } from './notifications';
import { rendererPaths } from './paths';
import sounds from './sounds';
import { idle } from './startup';
import {
	getAppMessages,
	getKeybinds,
	getSettings,
	setSettings,
} from './store-actions';
import { is } from './util';
import { serializeMenu, triggerMenuItemById } from './utils/menu-utils';
import sqlite3 from 'sqlite3';
import Logger from 'electron-log';



export default {
	initialize() {
		// Prevent duplicate handler registration
		if (!ipcMain.eventNames().includes(ipcChannels.GET_APP_INFO)) {
			ipcMain.handle(ipcChannels.GET_APP_INFO, async () => {
				const os = getOS();
				return {
					name: app.getName(),
					version: app.getVersion(),
					os,
					isMac: os === 'mac',
					isWindows: os === 'windows',
					isLinux: os === 'linux',
					isDev: is.debug,
					paths: rendererPaths,
				};
			});

			ipcMain.handle(ipcChannels.GET_RENDERER_SYNC, async () => {
				return {
					settings: getSettings(),
					keybinds: getKeybinds(),
					messages: getAppMessages(),
					appMenu: serializeMenu(Menu.getApplicationMenu()),
				};
			});

			ipcMain.on(
				ipcChannels.SET_KEYBIND,
				(
					_event,
					keybind: keyof CustomAcceleratorsType,
					accelerator: string,
				) => {
					kb.setKeybind(keybind, accelerator);
				},
			);

			ipcMain.on(
				ipcChannels.SET_SETTINGS,
				(_event, settings: Partial<SettingsType>) => {
					setSettings(settings);
				},
			);

			

			ipcMain.on(ipcChannels.APP_NOTIFICATION, (_event, options: any) => {
				notification(options);
			});

			ipcMain.on(ipcChannels.PLAY_SOUND, (_event, sound: string) => {
				sounds.play(sound);
			});

			ipcMain.on(
				ipcChannels.TRIGGER_APP_MENU_ITEM_BY_ID,
				(_event, id: string) => {
					triggerMenuItemById(Menu.getApplicationMenu(), id);
				},
			);

			ipcMain.on(ipcChannels.OPEN_URL, (_event, url: string) => {
				shell.openExternal(url);
			});

			// Only set idle state when renderer is ready
			ipcMain.once(ipcChannels.RENDERER_READY, idle);
		}
	},
};
