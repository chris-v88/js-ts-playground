/**
 * Main entry point
 * Initializes the playground and handles event listeners
 */

import { initializeEditor, getEditor, getMonacoLibrary, getEditorCode, updateEditorLanguage, updateEditorTheme, updateEditorWordWrap } from './editor.js';
import { getSettings, setSetting, saveSettingsToStorage, loadSettings, saveCodeToStorage, clearSettingsStorage, clearCodeStorage, getSetting } from './storage-manager.js';
import { showSettingsPopup, applyThemeToContainers, getEl } from './ui.js';
import { MessageType } from './constants.js';
import { executeCode } from './compiler.js';

// Expose global functions for HTML onclick handlers
window.runCode = runCode;
window.downloadCode = downloadCode;

/**
 * Run code is called when the "Run Code" button is clicked
 */
async function runCode() {
  const outputEl = getEl('output-container');
  outputEl.innerHTML = '';
  try {
    outputEl.classList.remove('error-text');
    const code = getEditorCode();
    const language = getSetting('language');
    await executeCode(code, language, outputEl);
  } catch (error) {
    outputEl.textContent += '❗️ Error: ' + error.message + '\n';
    outputEl.classList.add('error-text');
  }
}

/**
 * Download code as a file
 * This function is called when the "Download Code" button is clicked
 */
function downloadCode() {
  showSettingsPopup(
    'Sorry, download feature is not implemented yet.',
    MessageType.WARNING,
    2500,
  );
}

/**
 * Handle language selector change
 */
function handleLanguageChange(target) {
  setSetting('language', target.value);
  updateEditorLanguage(target.value);

  const settings = getSettings();
  settings.saveSettings && saveSettingsToStorage();

  showSettingsPopup(
    `Language changed to <b>${target.value}</b>`
  );
}

/**
 * Handle save settings toggle
 */
function handleSaveSettingsChange(target) {
  setSetting('saveSettings', target.checked);
  saveSettingsToStorage();

  if (!target.checked) {
    clearSettingsStorage();
  }

  showSettingsPopup(
    `Auto Save Settings is now <b>${target.checked ? 'enabled' : 'disabled'}</b>
    ${target.checked ? `<br />Settings: <pre>${JSON.stringify(getSettings(), null, 2)}</pre>` : '<br />All settings have been cleared from local storage.'}
    `,
    target.checked ? MessageType.SUCCESS : MessageType.CAUTION
  );
}

/**
 * Handle save code toggle
 */
function handleSaveCodeChange(target) {
  setSetting('saveCode', target.checked);
  if (target.checked) {
    saveCodeToStorage(getEditorCode());
  } else {
    clearCodeStorage();
  }
  getSetting('saveSettings') && saveSettingsToStorage();

  showSettingsPopup(
    `Auto Save is now <b>${target.checked ? 'enabled' : 'disabled'}</b>`,
    target.checked ? MessageType.SUCCESS : MessageType.CAUTION
  );
}

/**
 * Handle theme toggle
 */
function handleThemeToggle(target) {
  const themeValue = target.checked ? 'vs' : 'vs-dark';
  setSetting('theme', themeValue);
  updateEditorTheme(themeValue);
  getSetting('saveSettings') && saveSettingsToStorage();

  showSettingsPopup(`Theme changed to <b>${themeValue}</b>`);

  applyThemeToContainers(target.checked);
}

/**
 * Handle wrap text toggle
 */
function handleWrapTextChange(target) {
  setSetting('wrapText', target.checked);
  updateEditorWordWrap(target.checked);
  getSetting('saveSettings') && saveSettingsToStorage();

  showSettingsPopup(
    `Wrap Text is now <b>${target.checked ? 'enabled' : 'disabled'}</b>`,
    target.checked ? MessageType.SUCCESS : MessageType.CAUTION
  );
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
  window.addEventListener('change', (e) => {
    const target = e.target;

    if (target.id === 'language-selector') {
      handleLanguageChange(target);
    }

    if (target.id === 'save-settings') {
      handleSaveSettingsChange(target);
    }

    if (target.id === 'save-code') {
      handleSaveCodeChange(target);
    }

    if (target.id === 'theme-toggle') {
      handleThemeToggle(target);
    }

    if (target.id === 'wrap-text') {
      handleWrapTextChange(target);
    }
  });
}

/**
 * Initialize Monaco Editor via CDN
 */
function initializeMonaco() {
  window.require.config({
    paths: {
      vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.47.0/min/vs',
    },
  });

  window.require(['vs/editor/editor.main'], (monaco) => {
    initializeEditor(monaco);
    setupEventListeners();
  });
}

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeMonaco);
} else {
  initializeMonaco();
}
