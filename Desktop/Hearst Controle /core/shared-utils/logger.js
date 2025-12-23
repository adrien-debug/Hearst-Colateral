/**
 * HEARST CONTROL - Core Logger
 * Logger centralisé pour tous les projets
 */

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

class Logger {
  constructor(projectName = 'HEARST-CONTROL') {
    this.projectName = projectName;
  }

  _formatMessage(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${this.projectName}] [${level}]`;
    
    if (data) {
      return `${prefix} ${message}\n${JSON.stringify(data, null, 2)}`;
    }
    return `${prefix} ${message}`;
  }

  info(message, data = null) {
    console.log(
      colors.blue + this._formatMessage('INFO', message, data) + colors.reset
    );
  }

  success(message, data = null) {
    console.log(
      colors.green + '✅ ' + this._formatMessage('SUCCESS', message, data) + colors.reset
    );
  }

  warning(message, data = null) {
    console.warn(
      colors.yellow + '⚠️  ' + this._formatMessage('WARNING', message, data) + colors.reset
    );
  }

  error(message, error = null) {
    const errorData = error ? {
      message: error.message,
      stack: error.stack
    } : null;
    
    console.error(
      colors.red + '❌ ' + this._formatMessage('ERROR', message, errorData) + colors.reset
    );
  }

  debug(message, data = null) {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        colors.magenta + this._formatMessage('DEBUG', message, data) + colors.reset
      );
    }
  }

  start(message) {
    console.log(
      colors.cyan + colors.bright + '🚀 ' + this._formatMessage('START', message) + colors.reset
    );
  }
}

// Instance par défaut
const defaultLogger = new Logger();

module.exports = {
  Logger,
  logger: defaultLogger
};

