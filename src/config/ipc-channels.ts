// Whitelist channels for IPC
export type Channels = string;

// Main -> Renderer
const APP_UPDATED = 'app-updated';
const APP_NOTIFICATION = 'app-notification'; // to display a notification using the OS notification system

const PRELOAD_SOUNDS = 'preload-sounds';
const PLAY_SOUND = 'play-sound';

// Renderer -> Main
const GET_APP_INFO = 'get-app-info';
const GET_APP_PATHS = 'get-app-paths';
const GET_RENDERER_SYNC = 'get-renderer-sync';

const SET_KEYBIND = 'set-keybind';
const SET_SETTINGS = 'set-settings';

const RENDERER_READY = 'renderer-ready';

const TRIGGER_APP_MENU_ITEM_BY_ID = 'trigger-app-menu-item-by-id';
const OPEN_URL = 'open-url';
const GENERATE_PDF = 'generate-pdf';
const PDF_GENERATED = 'pdf-generated';
const PDF_GENERATION_ERROR = 'pdf-generation-error';

// Adding new channels for fetching and saving student data
const FETCH_STUDENT_DATA = 'fetch-student-data';
const SAVE_STUDENT_DATA = 'save-student-data';

export const ipcChannels = {
	// main -> renderer
	APP_NOTIFICATION,
	APP_UPDATED,
	PRELOAD_SOUNDS,
	PLAY_SOUND,
	PDF_GENERATED,
	PDF_GENERATION_ERROR,
	// renderer -> main
	RENDERER_READY,
	GET_RENDERER_SYNC,
	GET_APP_INFO,
	GET_APP_PATHS,
	SET_KEYBIND,
	SET_SETTINGS,
	TRIGGER_APP_MENU_ITEM_BY_ID,
	OPEN_URL,
	GENERATE_PDF,
	FETCH_STUDENT_DATA, // newly added channel for fetching student data
	SAVE_STUDENT_DATA, // newly added channel for saving student data
};
