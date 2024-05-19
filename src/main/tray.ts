import { app, Tray as ElectronTray, Menu } from 'electron';
import path from 'path';
import { __resources } from './paths';
import { is } from './util';
import windows from './windows';

// macOS needs dark/light versions
const systemIcon = () => {
	if (is.macos) {
		// icon needs to be in format 'xxxTemplate' to work with system theme on macOS
		return 'tray-Template.png';
	}

	if (is.windows) {
		return 'icon.ico';
	}

	return 'icon.png';
};

const getIconPath = () => {
	// Using relative path to ensure compatibility
	return path.join(__resources, 'icons', systemIcon());
};

const initialize = () => {
	windows.tray = new ElectronTray(getIconPath());

	const contextMenu = Menu.buildFromTemplate([
		{ role: 'about' },
		{ role: 'quit' },
	]);
	windows.tray.setToolTip(`${app.name}`);
	windows.tray.setContextMenu(contextMenu);
};

const destroy = () => {
	windows.tray?.destroy();
	windows.tray = null;
};

export default {
	initialize,
	destroy,
};
