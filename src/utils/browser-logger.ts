// Browser-safe logger utility
export const log = {
  error: (message: string, meta?: any) => {
    console.error(`[ERROR] ${message}`, meta);
  },
  warn: (message: string, meta?: any) => {
    console.warn(`[WARN] ${message}`, meta);
  },
  info: (message: string, meta?: any) => {
    console.info(`[INFO] ${message}`, meta);
  },
  http: (message: string, meta?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[HTTP] ${message}`, meta);
    }
  },
  debug: (message: string, meta?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${message}`, meta);
    }
  },
};

export default log;
