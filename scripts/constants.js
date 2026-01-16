/**
 * Constants used throughout the playground
 */

// Auto-save interval
export const AUTO_SAVE_INTERVAL_MS = 3000;

// Initial code templates
export const INIT_JS_CODE = `// Start coding!\nconst greeting = (name) => console.log('Hello ' + name + '!');\ngreeting('World');`;
export const INIT_TS_CODE = `// Start coding!\nconst greeting: (name: string) => void = (name) => console.log('Hello ' + name + '!');\ngreeting('World');`;

// Local storage keys
export const LOCAL_STORAGE_SETTINGS = 'PLAYGROUND__settings';
export const LOCAL_STORAGE_CODE = 'PLAYGROUND__code';

// Cookie
export const PLAYGROUND_DEV = 'PLAYGROUND__dev_debug';

// Default settings
export const DEFAULT_SETTINGS = {
  language: 'javascript',
  theme: 'vs-dark',
  saveCode: false,
  saveSettings: false,
  wrapText: false,
};

// Message types
export const MessageType = {
  SUCCESS: 'positive',
  INFO: 'blue',
  WARNING: 'negative',
  CAUTION: 'orange',
};

export const IconMappingMessageType = {
  [MessageType.SUCCESS]: 'thumbs up outline icon',
  [MessageType.INFO]: 'info',
  [MessageType.WARNING]: 'exclamation triangle',
  [MessageType.CAUTION]: 'exclamation circle',
};
