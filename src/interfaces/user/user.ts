export interface ILoginResponse {
  message: string;
  usuario: IUser;
}
export interface IUser {
  id_usuario: number;
  nome: string;
  email: string;
  senha: string;
  tipo: EUserType;
  data_criacao: string;
  deletado: boolean;
  token: Token[];
}

export enum EUserType {
  ADMIN = 'admin',
  USER = 'usuario',
}

export interface Token {
  id: number;
  usuario_id: number;
  token: string;
  dt_criacao: string;
  dt_expiracao: string;
}
