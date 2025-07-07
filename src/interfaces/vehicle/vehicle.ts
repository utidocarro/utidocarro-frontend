export interface IVehicle {
  id: number;
  modelo: string;
  marca: string;
  ano: number;
  placa: string;
  cliente: number;
  deletado: boolean;
  cliente_nome?: string;
}
