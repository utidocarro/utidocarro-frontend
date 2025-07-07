/* eslint-disable no-async-promise-executor */
import axios, { AxiosResponse } from 'axios';

import {
  ApiRequest,
  httpMethods,
  IAddServiceTypeRequest,
  IAddServiceTypeResponse,
  IAddUserRequest,
  IAddUserResponse,
  IAddVehicleRequest,
  IAddVehicleResponse,
  IDefaultResponse,
  IEditServiceTypeRequest,
  IEditServiceTypeResponse,
  IEditUserRequest,
  IEditUserResponse,
  IEditVehicleRequest,
  IEditVehicleResponse,
  ILoginRequest,
  ILoginResponse,
  IRequestPasswordResetRequest,
  IRequestPasswordResetResponse,
  IResetPasswordRequest,
  IResetPasswordResponse,
} from '@interfaces/api';
import { api } from './api';
import { IUser } from '@interfaces/user/user';
import { IVehicle } from '@interfaces/vehicle/vehicle';
import { IServiceType } from '@interfaces/servicetype/servicetype';

const { CancelToken } = axios;

// = ============================================================
export const request = async <T>({
  api,
  method,
  endpoint,
  data,
  timeout = 10000, // 10 seconds
  config = {},
}: ApiRequest): Promise<T> => {
  return new Promise(async (resolve, reject) => {
    const source = CancelToken.source();
    config = { ...config, cancelToken: source.token };

    const reqExpire = new Promise((_, reject) => {
      setTimeout(() => {
        source.cancel('Request timed out');
        reject(new Error(`Request timed out: ${endpoint}`));
      }, timeout);
    });

    try {
      const httpMethods: httpMethods = {
        get: async () => await api.get<T>(endpoint, config),
        post: async () => await api.post<T>(endpoint, data, config),
        put: async () => await api.put<T>(endpoint, data, config),
        delete: async () => await api.delete<T>(endpoint, config),
        patch: async () => await api.patch<T>(endpoint, data, config),
      };

      const response = (await Promise.race([
        httpMethods[method](),
        reqExpire,
      ])) as AxiosResponse<T>;

      resolve(response?.data);
    } catch (error) {
      reject(error);
    }
  });
};

// = ============================================================
export const login = async (data: ILoginRequest) =>
  await request<ILoginResponse>({
    api,
    endpoint: '/api/login',
    method: 'post',
    data,
  });

// = ============================================================
export const addUser = async (data: IAddUserRequest) =>
  await request<IAddUserResponse>({
    api,
    endpoint: '/api/usuarios/cadastro',
    method: 'post',
    data,
  });

// = ============================================================
export const getUsers = async () =>
  await request<Array<Omit<IUser, 'token'>>>({
    api,
    endpoint: '/api/usuarios/busca_usuarios',
    method: 'get',
  });

// = ============================================================
export const getUserById = async (id: number) =>
  await request<Omit<IUser, 'token'>>({
    api,
    endpoint: `/api/usuarios/${id}`,
    method: 'get',
  });

// = ============================================================
export const deleteUserById = async (id: number) =>
  await request<IDefaultResponse>({
    api,
    endpoint: `/api/usuarios/${id}`,
    method: 'patch',
  });

// = ============================================================
export const editUser = async (data: IEditUserRequest) =>
  await request<IEditUserResponse>({
    api,
    endpoint: `/api/usuarios/${data.id}`,
    method: 'put',
    data,
  });

// = ============================================================
export const addVehicle = async (data: IAddVehicleRequest) =>
  await request<IAddVehicleResponse>({
    api,
    endpoint: '/api/veiculos/cadastro',
    method: 'post',
    data,
  });

// = ============================================================
export const getVehicles = async () =>
  await request<Array<IVehicle>>({
    api,
    endpoint: '/api/veiculos/busca_veiculos',
    method: 'get',
  });

// = ============================================================
export const deleteVehicleById = async (id: number) =>
  await request<IDefaultResponse>({
    api,
    endpoint: `/api/veiculos/${id}`,
    method: 'patch',
  });

// = ============================================================
export const editVehicle = async (data: IEditVehicleRequest) =>
  await request<IEditVehicleResponse>({
    api,
    endpoint: `/api/veiculos/${data.id}`,
    method: 'put',
    data,
  });

// = ============================================================

export const addServiceType = async (data: IAddServiceTypeRequest) =>
  await request<IAddServiceTypeResponse>({
    api,
    endpoint: '/api/tiposervico/cadastro',
    method: 'post',
    data,
  });

// = ============================================================
export const getServiceType = async () =>
  await request<Array<IServiceType>>({
    api,
    endpoint: '/api/tiposervico/todos',
    method: 'get',
  });

// = ============================================================
export const deleteServiceTypeById = async (id: number) =>
  await request<IDefaultResponse>({
    api,
    endpoint: `/api/tiposervico/${id}`,
    method: 'patch',
  });

// = ============================================================
export const editServiceType = async (data: IEditServiceTypeRequest) =>
  await request<IEditServiceTypeResponse>({
    api,
    endpoint: `/api/tiposervico/${data.id}`,
    method: 'put',
    data,
  });

// = ============================================================
export const requestPasswordReset = async (
  data: IRequestPasswordResetRequest,
) =>
  await request<IRequestPasswordResetResponse>({
    api,
    endpoint: '/api/auth/request-password-reset',
    method: 'post',
    data,
  });

//= =================================================================================
export const resetPassword = async (data: IResetPasswordRequest) =>
  await request<IResetPasswordResponse>({
    api,
    endpoint: '/api/auth/reset-password',
    method: 'post',
    data,
  });
