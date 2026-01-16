/**
 * Monaco Editor initialization and setup
 */

import { getSettings, loadSettings } from './storage-manager.js';
import { getEl, debounce } from './ui.js';
import { AUTO_SAVE_INTERVAL_MS } from './constants.js';
import { saveCodeToStorage } from './storage-manager.js';

let editor, monacoLibrary;

export const getEditor = () => editor;

export const getMonacoLibrary = () => monacoLibrary;

/**
 * Initialize Monaco editor
 */
export const initializeEditor = (monaco) => {
  monacoLibrary = monaco;
  loadSettings();

  const settings = getSettings();
  const outputEl = getEl('output-container');

  editor = monaco.editor.create(getEl('editor-container'), {
    value: settings.code,
    language: settings.language,
    theme: settings.theme,
    automaticLayout: true,
    fontSize: 14,
    minimap: {
      enabled: false,
    },
    wordWrap: settings.wrapText ? 'on' : 'off',
    tabSize: 2,
    insertSpaces: true,
    autoIndent: 'advanced',
    suggestOnTriggerCharacters: true,
    quickSuggestions: true,
    parameterHints: { enabled: true },
    folding: true,
    foldingStrategy: 'auto',
    bracketPairColorization: { enabled: true },
    find: {
      addExtraSpaceOnTop: true,
      seedSearchStringFromSelection: true,
    },
    hover: { enabled: true },
    contextmenu: true,
  });

  // Track previous scrollbar state to avoid unnecessary updates
  let previousHasVerticalScrollbar = false;

  // Debounced function to update minimap based on scrollbar presence
  const updateMinimap = debounce(() => {
    const layoutInfo = editor.getLayoutInfo();
    const viewportHeight = layoutInfo.height;
    const scrollHeight = editor.getScrollHeight();
    const hasVerticalScrollbar = scrollHeight > viewportHeight;

    // Only update if the scrollbar state has actually changed
    if (hasVerticalScrollbar !== previousHasVerticalScrollbar) {
      previousHasVerticalScrollbar = hasVerticalScrollbar;
      editor.updateOptions({
        minimap: { enabled: hasVerticalScrollbar },
      });
    }
  }, 1500);

  // Content change listener for editor
  editor.onDidChangeModelContent(updateMinimap);

  // Auto-save code every 3 seconds if saveCode is enabled
  setInterval(() => {
    const currentSettings = getSettings();
    if (currentSettings.saveCode) {
      saveCodeToStorage(editor.getValue());
    }
  }, AUTO_SAVE_INTERVAL_MS);
};

/**
 * Get current code from editor
 */
export const getEditorCode = () => {
  return editor.getValue();
};

/**
 * Update editor language
 */
export const updateEditorLanguage = (language) => {
  if (monacoLibrary && editor) {
    monacoLibrary.editor.setModelLanguage(editor.getModel(), language);
  }
};

/**
 * Update editor theme
 */
export const updateEditorTheme = (theme) => {
  if (monacoLibrary && editor) {
    monacoLibrary.editor.setTheme(theme);
  }
};

/**
 * Update editor word wrap
 */
export const updateEditorWordWrap = (shouldWrap) => {
  if (editor) {
    editor.updateOptions({
      wordWrap: shouldWrap ? 'on' : 'off',
    });
  }
};
