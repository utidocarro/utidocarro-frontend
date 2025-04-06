export interface IUser {
    id_usuario: number;
    nome: string;
    email: string;
    senha: string;
    tipo: keyof typeof EUserType;
    data_criacao: string;
    deletado: boolean;
    token: string;
}

export enum EUserType {
    ADMIN = 'admin',
    USER = 'usuario',
}
