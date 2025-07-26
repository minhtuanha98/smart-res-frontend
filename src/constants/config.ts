// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/user/login',
    LOGOUT: '/user/logout',
    REFRESH_TOKEN: '/auth/refresh_token',
  },
  FEEDBACK: {
    USER_LIST: '/user/list/feedbacks',
    USER_FEEDBACK: '/user/feedback',
  },
  USER: {
    LIST: '/user/list-user',
  },
};

// App Configuration
export const APP_CONFIG = {
  NAME: 'Smart Residence',
  VERSION: '1.0.0',
  DESCRIPTION: 'Smart Residence Management System',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user_data',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
  MAX_PAGE_SIZE: 100,
};

// Logging Configuration
export const LOG_CONFIG = {
  LEVELS: {
    ERROR: 'error',
    WARN: 'warn',
    INFO: 'info',
    HTTP: 'http',
    DEBUG: 'debug',
  },
  MAX_FILE_SIZE: '20m',
  MAX_FILES: '14d',
  DATE_PATTERN: 'YYYY-MM-DD',
};

// React Query Configuration
export const REACT_QUERY_CONFIG = {
  STALE_TIME: 5 * 60 * 1000, // 5 minutes
  CACHE_TIME: 10 * 60 * 1000, // 10 minutes
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: (attemptIndex: number) =>
    Math.min(1000 * 2 ** attemptIndex, 30000),
};

// API Configuration
export const API_CONFIG = {
  TIMEOUT: 10000, // 10 seconds
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  RETRY_STATUS_CODES: [408, 429, 500, 502, 503, 504],
};
