/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { IServiceType } from '@interfaces/servicetype/servicetype';
import { EUserType, IUser } from '@interfaces/user/user';
import { IVehicle } from '@interfaces/vehicle/vehicle';
import { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface IHttp {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T>;
  put<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  patch<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
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

export interface IDefaultResponse {
  message?: string;
  error?: string;
}

// = ============================================================
export interface ILoginRequest {
  email: string;
  senha: string;
}

export interface ILoginResponse {
  message: string;
  usuario: IUser;
}

// = ============================================================
export interface IAddUserRequest {
  nome: string;
  email: string;
  senha: string;
  tipo: EUserType;
}

export interface IAddUserResponse {
  message: string;
  usuario: Omit<IUser, 'token'>;
  token: string;
}

// = ============================================================
export interface IEditUserRequest extends Omit<IAddUserRequest, 'senha'> {
  id: number;
}

export interface IEditUserResponse
  extends Omit<IAddUserResponse, 'token' | 'senha'> {}

// = ============================================================
export interface IAddVehicleRequest extends Omit<IVehicle, 'id' | 'deletado'> {}

export interface IAddVehicleResponse extends IDefaultResponse {
  veiculo?: IVehicle;
}

// = ============================================================
export interface IEditVehicleRequest extends Omit<IVehicle, 'deletado'> {}

export interface IEditVehicleResponse extends IDefaultResponse {
  veiculo?: IVehicle;
}

// = ============================================================

export interface IAddServiceTypeRequest
  extends Omit<IServiceType, 'id' | 'deletado'> {}

export interface IAddServiceTypeResponse extends IDefaultResponse {
  servicetype?: IServiceType;
}

// = ============================================================

export interface IEditServiceTypeRequest
  extends Omit<IServiceType, 'deletado'> {}

export interface IEditServiceTypeResponse extends IDefaultResponse {
  tipoServico: any;
  servicetype?: IServiceType;
}

// = ============================================================
