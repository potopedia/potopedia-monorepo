import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor: Add auth token
apiClient.interceptors.request.use(
  async (config) => {
    // Get Firebase token
    const { auth } = await import('./firebase');
    const user = auth.currentUser;

    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      const { auth } = await import('./firebase');
      await auth.signOut();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
