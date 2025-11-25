export const API_BASE = process.env.API_BASE || 'https://api.returnsportal.online';
const API_KEY = process.env.API_KEY || '';
const PASSWORD = process.env.PASSWORD || '';

export const getAuthHeader = () => {
  if (!API_KEY || !PASSWORD) {
    throw new Error('API credentials not configured. Please check your .env.local file.');
  }
  return `Bearer token="${PASSWORD}", api_key="${API_KEY}"`;
};