// En dev  → proxy Vite ('/api' → localhost:3001)
// En prod → variable d'environnement VITE_API_URL (ex: https://mon-backend.up.railway.app)
const BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `Erreur ${res.status}`);
  return data;
}

// ── Destinations ──────────────────────────────────────────────

export const destinationsApi = {
  getAll: () => request('/destinations'),
  getById: (id) => request(`/destinations/${id}`),
};

// ── Chat ──────────────────────────────────────────────────────

export const chatApi = {
  send: (messages) =>
    request('/chat', {
      method: 'POST',
      body: JSON.stringify({ messages }),
    }),
};

// ── Bookings ──────────────────────────────────────────────────

export const bookingsApi = {
  create: (payload) =>
    request('/bookings', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};
