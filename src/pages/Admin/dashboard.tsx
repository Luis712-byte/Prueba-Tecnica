import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importamos Link para la navegación
import api from '../services/api';

const Dashboard = () => {
  const [role, setRole] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchRoleFromToken = async (): Promise<void> => {
    const storedToken = localStorage.getItem("accessToken");

    if (!storedToken) {
      setError("No se encontró un token válido.");
      return;
    }

    try {
      const response = await api.post('/users/by-token', { token: storedToken });

      if (response.status === 200) {
        setRole(response.data.rol);
      } else {
        setError("No se pudo obtener el rol.");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError("Error al obtener el rol: " + error.message);
      } else {
        setError("Ocurrió un error desconocido.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  useEffect(() => {
    fetchRoleFromToken();
  }, []);

  const renderMenuOptions = () => {
    if (role === "Admin") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/Products"
            className="bg-green-100 border border-green-400 text-green-700 p-6 rounded-lg shadow-md hover:bg-green-200 transition"
          >
            <h3 className="text-xl font-semibold">Gestión de Productos</h3>
            <p className="mt-2">Crear, actualizar o eliminar productos.</p>
          </Link>
          <Link
            to="/orders"
            className="bg-green-100 border border-green-400 text-green-700 p-6 rounded-lg shadow-md hover:bg-green-200 transition"
          >
            <h3 className="text-xl font-semibold">Gestión de Órdenes</h3>
            <p className="mt-2">Ver todas las órdenes de compra.</p>
          </Link>
        </div>
      );
    } else if (role === "Usuario") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/orders"
            className="bg-blue-100 border border-blue-400 text-blue-700 p-6 rounded-lg shadow-md hover:bg-blue-200 transition"
          >
            <h3 className="text-xl font-semibold">Mis Órdenes</h3>
            <p className="mt-2">Ver y gestionar tus órdenes de compra.</p>
          </Link>
          <Link
            to="/products"
            className="bg-blue-100 border border-blue-400 text-blue-700 p-6 rounded-lg shadow-md hover:bg-blue-200 transition"
          >
            <h3 className="text-xl font-semibold">Productos</h3>
            <p className="mt-2">Explorar y realizar pedidos de productos.</p>
          </Link>
        </div>
      );
    } else {
      return (
        <p className="text-gray-700 text-center">Cargando opciones...</p>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Parte superior con el encabezado y el rol */}
      {/* Parte superior con el encabezado, el rol y el botón de cerrar sesión */}
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-extrabold text-gray-800">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
        >
          Cerrar sesión
        </button>
      </div>
      <div className="w-full max-w-4xl mx-auto">
        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold">⚠️ Error</h2>
            <p className="mt-2">{error}</p>
          </div>
        ) : (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <h2 className="text-2xl font-semibold mr-2">👤 Rol del Usuario:</h2>
              <h2 className="Role text-2xl font-semibold mr-2">{role || "Cargando..."}</h2>
            </div>
          </div>

        )}
      </div>

      {/* Parte inferior con los menús según el rol */}
      <div className="w-full max-w-4xl mx-auto">
        {renderMenuOptions()}
      </div>
    </div>
  );
};

export default Dashboard;