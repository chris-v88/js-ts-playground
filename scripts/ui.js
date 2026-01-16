/**
 * UI utilities and DOM helpers
 */

import { MessageType, IconMappingMessageType } from './constants.js';

export const getEl = (id) => document.getElementById(id);

/**
 * Show settings popup with message
 */
export const showSettingsPopup = (
  message,
  messageType = MessageType.INFO,
  sec = 5000,
) => {
  const popup = document.getElementById('settings-popup');

  // Remove previous type classes
  popup.classList.remove('positive', 'blue', 'negative', 'black', 'orange');
  // Add the new type class
  popup.classList.add(messageType);

  // Use the icon that matches the type, fallback to INFO icon if not found
  const iconClass = IconMappingMessageType[messageType];

  popup.innerHTML = `<i class="${iconClass} icon"></i> ${message}`;
  popup.style.display = 'block';

  setTimeout(() => {
    popup.style.display = 'none';
  }, sec);
};

/**
 * Apply light or dark theme to containers
 */
export const applyThemeToContainers = (isLight) => {
  const editorEl = getEl('editor-container');
  const outputEl = getEl('output-container');

  if (isLight) {
    editorEl.classList.add('bg-light', 'text-dark');
    editorEl.classList.remove('bg-dark', 'text-light');
    outputEl.classList.add('bg-light', 'text-dark');
    outputEl.classList.remove('bg-dark', 'text-light');
  } else {
    editorEl.classList.add('bg-dark', 'text-light');
    editorEl.classList.remove('bg-light', 'text-dark');
    outputEl.classList.add('bg-dark', 'text-light');
    outputEl.classList.remove('bg-light', 'text-dark');
  }
};

/**
 * Debounce utility function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};
