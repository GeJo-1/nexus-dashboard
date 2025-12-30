// client/src/api.js

// If the app is live (Vercel), use the live backend URL.
// If the app is local (your laptop), use localhost:5000.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default API_URL;