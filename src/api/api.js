const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3000';

async function apiFetch(path, opts = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    ...opts,
  });
  const text = await res.text();
  try { return JSON.parse(text); } catch (e) { return text; }
}

export default { apiFetch };
