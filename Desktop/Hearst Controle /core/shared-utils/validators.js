/**
 * HEARST CONTROL - Core Validators
 * Validateurs réutilisables pour tous les projets
 */

/**
 * Valide une adresse email
 * @param {string} email 
 * @returns {boolean}
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valide un mot de passe
 * @param {string} password 
 * @param {object} options - { minLength, requireUppercase, requireNumber, requireSpecial }
 * @returns {object} { valid: boolean, errors: string[] }
 */
const validatePassword = (password, options = {}) => {
  const {
    minLength = 8,
    requireUppercase = true,
    requireNumber = true,
    requireSpecial = true
  } = options;

  const errors = [];

  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters`);
  }

  if (requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (requireNumber && !/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (requireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

/**
 * Valide un UUID
 * @param {string} uuid 
 * @returns {boolean}
 */
const isValidUUID = (uuid) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

/**
 * Valide un ID de projet
 * @param {string} projectId - Format: "QATAR-001", "AQUA-001", etc.
 * @returns {boolean}
 */
const isValidProjectId = (projectId) => {
  const projectIdRegex = /^[A-Z]+-\d{3}$/;
  return projectIdRegex.test(projectId);
};

/**
 * Valide un rôle utilisateur
 * @param {string} role 
 * @returns {boolean}
 */
const isValidRole = (role) => {
  const validRoles = ['admin', 'manager', 'operator', 'viewer'];
  return validRoles.includes(role);
};

/**
 * Sanitize une chaîne de caractères
 * @param {string} str 
 * @returns {string}
 */
const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
};

/**
 * Valide un objet de données requis
 * @param {object} data 
 * @param {string[]} requiredFields 
 * @returns {object} { valid: boolean, missingFields: string[] }
 */
const validateRequiredFields = (data, requiredFields) => {
  const missingFields = [];
  
  for (const field of requiredFields) {
    if (!data || data[field] === undefined || data[field] === null || data[field] === '') {
      missingFields.push(field);
    }
  }

  return {
    valid: missingFields.length === 0,
    missingFields
  };
};

module.exports = {
  isValidEmail,
  validatePassword,
  isValidUUID,
  isValidProjectId,
  isValidRole,
  sanitizeString,
  validateRequiredFields
};

