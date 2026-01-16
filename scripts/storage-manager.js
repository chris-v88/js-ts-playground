/**
 * Settings management with localStorage integration
 */

import { DEFAULT_SETTINGS, LOCAL_STORAGE_SETTINGS, LOCAL_STORAGE_CODE, INIT_JS_CODE, INIT_TS_CODE } from './constants.js';
import { getLocalStorage, setLocalStorage, removeLocalStorage } from './storage.js';
import { getEl } from './ui.js';

let settings = { ...DEFAULT_SETTINGS };

export const getSettings = () => settings;

export const getSetting = (key) => settings[key];

export const setSetting = (key, value) => {
  settings[key] = value;
};

/**
 * Initialize code editor template based on language
 */
const initCodeEditor = (language = 'javascript') => {
  switch (language) {
    case 'javascript':
      return INIT_JS_CODE;
    case 'typescript':
      return INIT_TS_CODE;
    default:
      return INIT_JS_CODE;
  }
};

/**
 * Load settings from localStorage
 * If settings are not found, use default settings
 */
export const loadSettings = () => {
  const stored = getLocalStorage(LOCAL_STORAGE_SETTINGS);
  if (stored) {
    settings = { ...settings, ...stored };

    // Update language selector
    const langSelector = getEl('language-selector');
    if (langSelector && stored.language) {
      langSelector.value = stored.language;
    }

    // Update theme toggle
    const themeToggle = getEl('theme-toggle');
    if (themeToggle && typeof stored.theme === 'string') {
      themeToggle.checked = stored.theme === 'vs';
    }

    // Update saveCode checkbox
    const saveCodeCheckbox = getEl('save-code');
    if (saveCodeCheckbox && typeof stored.saveCode === 'boolean') {
      saveCodeCheckbox.checked = stored.saveCode;
    }

    // Update saveSettings checkbox
    const saveSettingsCheckbox = getEl('save-settings');
    if (saveSettingsCheckbox && typeof stored.saveSettings === 'boolean') {
      saveSettingsCheckbox.checked = stored.saveSettings;
    }

    // Update wrapText checkbox
    const wrapTextCheckbox = getEl('wrap-text');
    if (wrapTextCheckbox && typeof stored.wrapText === 'boolean') {
      wrapTextCheckbox.checked = stored.wrapText;
    }
  }

  // Load code separately from LOCAL_STORAGE_CODE
  if (settings.saveCode) {
    const savedCode = localStorage.getItem(LOCAL_STORAGE_CODE);
    settings.code = savedCode || initCodeEditor(settings.language);
  } else {
    settings.code = initCodeEditor(settings.language);
  }
};

/**
 * Save settings to localStorage
 */
export const saveSettingsToStorage = () => {
  const toSave = { ...settings };
  // Code is saved separately, so exclude it
  delete toSave.code;
  setLocalStorage(LOCAL_STORAGE_SETTINGS, toSave);
};

/**
 * Save code to localStorage
 */
export const saveCodeToStorage = (code) => {
  localStorage.setItem(LOCAL_STORAGE_CODE, code);
};

/**
 * Clear all settings from localStorage
 */
export const clearSettingsStorage = () => {
  removeLocalStorage(LOCAL_STORAGE_SETTINGS);
};

/**
 * Clear code from localStorage
 */
export const clearCodeStorage = () => {
  removeLocalStorage(LOCAL_STORAGE_CODE);
};
