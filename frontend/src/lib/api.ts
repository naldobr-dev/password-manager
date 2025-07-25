const API_URL = import.meta.env.VITE_API_PASSWORDS_URL || 'http://localhost:5000/api/passwords';
const API_KEY = import.meta.env.VITE_API_KEY || '';

async function apiRequest<T>(endpoint = '', method = 'GET', body?: any): Promise<T> {
  const token = localStorage.getItem('token');

  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'x-api-key': API_KEY
  };

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  if (res.status === 401) {
    localStorage.removeItem('token');
    localStorage.setItem('sessionExpired', 'true');
    window.location.reload();
    throw new Error('Sessão expirada. Faça login novamente.');
  }

  if (!res.ok) {
    throw new Error(`Erro na API: ${res.statusText}`);
  }

  return res.json();
}

export const api = {
  getAll: () => apiRequest('/'),
  create: (data: any) => apiRequest('/', 'POST', data),
  update: (id: string, data: any) => apiRequest(`/${id}`, 'PUT', data),
  remove: (id: string) => apiRequest(`/${id}`, 'DELETE')
};
