
import { toast } from "@/components/ui/use-toast";

// Base API URL - would be replaced with a real API endpoint
const API_BASE_URL = 'http://127.0.0.1:3000/api/v1';

// Generic fetch function with error handling
async function fetchWithAuth<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('auth_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    toast({
      variant: "destructive",
      title: "Error",
      description: message,
    });
    throw error;
  }
}

export const authApi = {
  login: async (username: string, password: string) => {
    return fetchWithAuth<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
  },
  
  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser: async () => {
    return fetchWithAuth<{ user: any }>('/auth/me');
  }
};

function createCrudApi<T>(resource: string) {
  return {
    getAll: async () => fetchWithAuth<T[]>(`/${resource}`),
    
    getById: async (id: string) => fetchWithAuth<T>(`/${resource}/${id}`),
    
    create: async (data: Partial<T>) => fetchWithAuth<T>(`/${resource}`, {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    
    update: async (id: string, data: Partial<T>) => fetchWithAuth<T>(`/${resource}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    
    delete: async (id: string) => fetchWithAuth<void>(`/${resource}/${id}`, {
      method: 'DELETE'
    })
  };
}

export const customerAPI = createCrudApi('customer');
export const employeeAPI = createCrudApi('user');
export const productAPI = createCrudApi('product');
export const orderAPI = createCrudApi('order');

export const chatApi = {
  sendMessage: async (message: string) => {
    return fetchWithAuth<{ response: string }>('/chat', {
      method: 'POST',
      body: JSON.stringify({ message })
    });
  }
};
