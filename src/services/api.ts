import { useGlobalStore } from '@/storage/useGlobalStorage';
import axios, { AxiosError } from 'axios';

// = ============================================================
export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// = ============================================================
api.interceptors.request.use(async (request) => {
  if (!request.url?.includes('login')) {
    const token = useGlobalStore.getState().user?.token[0].token;
    if (token) request.headers.authorization = `Bearer ${token}`;
  }
  console.log('REQUEST: ', request);

  return request;
});

// = ============================================================
api.interceptors.response.use(
  async (response) => {
    console.log('RESPONSE: ', response);

    return response;
  },
  (error: AxiosError) => {
    axios.CancelToken.source().cancel('Request canceled by interceptor.');

    console.log('RESPONSE ERROR: ', error);
    return Promise.reject(error.response?.data);
  },
);
