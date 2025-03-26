import { useState, useEffect } from 'react';
import api from '../services/api';

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [newOrder, setNewOrder] = useState({
    items: '',
    total: '',
  }); 

  const fetchRoleFromToken = async () => {
    const storedToken = localStorage.getItem('accessToken');
    if (!storedToken) return;

    try {
      const response = await api.post('/users/by-token', { token: storedToken });
      setRole(response.data.rol);
    } catch (error) {
      console.error('Error al obtener el rol:', error);
    }
  };

  // Función para obtener las órdenes
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error al obtener las órdenes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener los detalles de una orden
  const fetchOrderById = async (id: number) => {
    setLoading(true);
    try {
      const response = await api.get(`/orders/${id}`);
      setSelectedOrder(response.data); 
    } catch (error) {
      console.error('Error al obtener los detalles de la orden:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para crear una nueva orden (solo Cliente)
  const handleCreateOrder = async () => {
    if (!newOrder.items || !newOrder.total) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    console.log('Creando orden:', newOrder);

    try {
      const response = await api.post('/orders', newOrder);
      setOrders([...orders, response.data]); 
      setNewOrder({ items: '', total: '' });
    } catch (error) {
      console.error('Error al crear la orden:', error);
    }
  };

  useEffect(() => {
    fetchRoleFromToken();
    fetchOrders();
  }, []);

  return (
<div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 p-6">
  <div className="max-w-7xl mx-auto">
    <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Gestión de Órdenes</h1>

    {/* Crear una nueva orden (solo para Clientes) */}
    {role === 'Usuario' && (
      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Crear Nueva Orden</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <textarea
            placeholder="Items de la orden"
            value={newOrder.items}
            onChange={(e) => setNewOrder({ ...newOrder, items: e.target.value })}
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Total de la orden"
            value={newOrder.total}
            onChange={(e) => setNewOrder({ ...newOrder, total: e.target.value })}
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleCreateOrder}
          className="mt-6 bg-green-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-600 transition"
        >
          Crear Orden
        </button>
      </div>
    )}

    {/* Detalles de una orden */}
    {selectedOrder ? (
      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Detalles de la Orden</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p className="text-lg"><strong>Cliente:</strong> {selectedOrder.clientName}</p>
          <p className="text-lg"><strong>Items:</strong> {selectedOrder.items}</p>
          <p className="text-lg"><strong>Total:</strong> ${selectedOrder.total}</p>
          <p className="text-lg"><strong>Estado:</strong> {selectedOrder.status}</p>
        </div>
        <button
          onClick={() => setSelectedOrder(null)} 
          className="mt-6 bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Volver
        </button>
      </div>
    ) : (
      <>
        {/* Lista de órdenes */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Lista de Órdenes</h2>
        {loading ? (
          <div className="text-center text-xl text-gray-700">Cargando...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-lg rounded-lg">
              <thead>
                <tr>
                  <th className="py-4 px-6 bg-blue-500 text-white text-left">Cliente</th>
                  <th className="py-4 px-6 bg-blue-500 text-white text-left">Total</th>
                  <th className="py-4 px-6 bg-blue-500 text-white text-left">Estado</th>
                  <th className="py-4 px-6 bg-blue-500 text-white text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-100">
                    <td className="py-4 px-6">{order.clientName}</td>
                    <td className="py-4 px-6">${order.total}</td>
                    <td className="py-4 px-6">{order.status}</td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => fetchOrderById(order.id)} // Ver detalles de la orden
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </>
    )}
  </div>
</div>
  );
};

export default Orders;