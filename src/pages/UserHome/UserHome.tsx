import React from 'react';
import { Car, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import type { ServiceOrder } from '../types/user';

const mockOrders: ServiceOrder[] = [
  {
    id: '1',
    customerName: 'Pedro Oliveira',
    vehicleModel: 'Honda Civic 2020',
    status: 'in_progress',
    createdAt: '2024-03-15',
  },
  {
    id: '2',
    customerName: 'Ana Costa',
    vehicleModel: 'Toyota Corolla 2019',
    status: 'pending',
    createdAt: '2024-03-14',
  },
];

function UserHome() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Meus Serviços</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <Car className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-blue-600">Total de Serviços</p>
              <p className="text-2xl font-bold text-blue-800">12</p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div>
              <p className="text-sm text-yellow-600">Em Andamento</p>
              <p className="text-2xl font-bold text-yellow-800">3</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-green-600">Concluídos</p>
              <p className="text-2xl font-bold text-green-800">8</p>
            </div>
          </div>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-8 w-8 text-orange-600" />
            <div>
              <p className="text-sm text-orange-600">Pendentes</p>
              <p className="text-2xl font-bold text-orange-800">1</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Últimos Serviços</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Veículo</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Data</th>
                <th className="text-left py-2">Detalhes</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="py-2">{order.vehicleModel}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status === 'completed' ? 'Concluído' :
                       order.status === 'in_progress' ? 'Em Andamento' :
                       'Pendente'}
                    </span>
                  </td>
                  <td className="py-2">{order.createdAt}</td>
                  <td className="py-2">
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      Ver Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserHome;