import { useGlobalStore } from '@/storage/useGlobalStorage';
import { resetAllStore } from '@utils/index';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

// = ============================================================
export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// = ============================================================
api.interceptors.request.use(async (request) => {
  if (!request.url?.includes('login')) {
    const globalState = useGlobalStore.getState();
    const token =
      Array.isArray(globalState.user?.token) &&
      globalState.user?.token.length > 0
        ? globalState.user.token[0].token
        : null;
    if (token) request.headers.authorization = `Bearer ${token}`;
  }
  // console.log('REQUEST: ', request);

  return request;
});

// = ============================================================
api.interceptors.response.use(
  async (response) => {
    // console.log('RESPONSE: ', response);

    return response;
  },
  (error: AxiosError) => {
    axios.CancelToken.source().cancel('Request canceled by interceptor.');

    if (
      [error.status].includes(401) &&
      !error.request?.responseURL.includes('login')
    ) {
      toast.error(
        'Sua sessão expirou. Por favor, faça login novamente para continuar.',
      );
      resetAllStore();
    }

    // console.log('RESPONSE ERROR: ', error);
    return Promise.reject(error.response?.data);
  },
);
