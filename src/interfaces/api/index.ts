import { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface IHttp {
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T, D = any>(
        url: string,
        data?: D,
        config?: AxiosRequestConfig
    ): Promise<T>;
    put<T, D = any>(
        url: string,
        data?: D,
        config?: AxiosRequestConfig
    ): Promise<T>;
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    patch<T, D = any>(
        url: string,
        data?: D,
        config?: AxiosRequestConfig
    ): Promise<T>;
}

export interface httpMethods {
    get: Function;
    post: Function;
    put: Function;
    delete: Function;
    patch: Function;
}

export interface ApiRequest {
    api: AxiosInstance;
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    endpoint: string;
    data?: any;
    timeout?: number;
    config?: AxiosRequestConfig;
}

export interface ApiResponseError {
    error: string;
    message?: string;
}

// = ============================================================

export interface ILoginRequest {
    email: string;
    senha: string;
}
