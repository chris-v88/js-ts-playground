/**
 * Code compiler/executor for different languages
 */

export const compilerLanguage = {
  javascript: {
    compile: async (code, outputEl) => {
      const originalLog = console.log;
      let output = '';
      console.log = function (...args) {
        output += args.join(' ') + '\n';
      };

      try {
        new Function(code)();
        outputEl.classList.remove('error-text');
        outputEl.textContent = output;
      } catch (error) {
        outputEl.textContent = '❗️ Error: ' + error.message + '\n';
        outputEl.classList.add('error-text');
      }

      console.log = originalLog;
    },
    extension: 'js',
  },
  typescript: {
    compile: async (code, outputEl) => {
      outputEl.textContent =
        '❗️ Error: TypeScript execution is not supported yet.\n';
      outputEl.classList.add('error-text');
    },
    extension: 'ts',
  },
};

/**
 * Execute code using the appropriate compiler
 */
export const executeCode = async (code, language, outputEl) => {
  // Check if language is supported
  if (!language || !compilerLanguage[language]) {
    outputEl.textContent = `❗️ Error: Unsupported language "${language}"\n`;
    outputEl.classList.add('error-text');
    return;
  }

  // Get compiler for language
  const compiler = compilerLanguage[language];
  if (compiler.compile) {
    await compiler.compile(code, outputEl);
  } else {
    outputEl.textContent = `❗️ Error: No compile function defined for "${language}"\n`;
    outputEl.classList.add('error-text');
  }
};
