import axios, { AxiosError } from 'axios';

// = ============================================================
export const api = axios.create({
    baseURL: 'http://localhost:3000',
});

// = ============================================================
api.interceptors.request.use(async (request) => {
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
    }
);
