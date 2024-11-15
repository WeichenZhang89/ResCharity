import axios from 'axios';

export const API_URL = "https://cloud.resilientdb.com/graphql";

export const resilientDbClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor if needed
resilientDbClient.interceptors.request.use(
  (config) => {
    // Add any auth tokens or other headers here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
