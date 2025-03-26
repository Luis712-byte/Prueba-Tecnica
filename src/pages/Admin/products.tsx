import { useState, useEffect } from 'react';
import api from '../services/api';

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [searchId, setSearchId] = useState<string>('');
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    cantidad_stock: '',
  });
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // Función para obtener el rol del usuario
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

  // Función para obtener los productos
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para crear un producto (solo Admin)
  const handleCreateProduct = async () => {
    if (!newProduct.nombre || !newProduct.precio || !newProduct.cantidad_stock) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    try {
      const response = await api.post('/products', newProduct);
      setProducts([...products, response.data]);
      setNewProduct({ nombre: '', descripcion: '', precio: '', cantidad_stock: '' });
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };

  // Función para eliminar un producto (solo Admin)
  const handleDeleteProduct = async (id: number) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  // Función para actualizar un producto (solo Admin)
  const handleUpdateProduct = async () => {
    if (!editingProduct.nombre || !editingProduct.precio || !editingProduct.cantidad_stock) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    try {
      const response = await api.put(`/products/${editingProduct.id}`, editingProduct);
      setProducts(
        products.map((product) =>
          product.id === editingProduct.id ? response.data : product
        )
      );
      setEditingProduct(null);
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  const fetchProductById = async () => {
    if (!searchId) {
      alert('Por favor, ingresa un ID válido.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.get(`/products/${searchId}`);
      setSelectedProduct(response.data);
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      alert('No se encontró un producto con ese ID.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoleFromToken();
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Gestión de Productos</h1>
        {role === 'Admin' && (
          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              {editingProduct ? 'Editar Producto' : 'Crear Producto'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Nombre del producto"
                value={editingProduct ? editingProduct.nombre : newProduct.nombre}
                onChange={(e) =>
                  editingProduct
                    ? setEditingProduct({ ...editingProduct, nombre: e.target.value })
                    : setNewProduct({ ...newProduct, nombre: e.target.value })
                }
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Descripción del producto"
                value={editingProduct ? editingProduct.descripcion : newProduct.descripcion}
                onChange={(e) =>
                  editingProduct
                    ? setEditingProduct({ ...editingProduct, descripcion: e.target.value })
                    : setNewProduct({ ...newProduct, descripcion: e.target.value })
                }
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Precio del producto"
                value={editingProduct ? editingProduct.precio : newProduct.precio}
                onChange={(e) =>
                  editingProduct
                    ? setEditingProduct({ ...editingProduct, precio: e.target.value })
                    : setNewProduct({ ...newProduct, precio: e.target.value })
                }
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Cantidad en stock"
                value={editingProduct ? editingProduct.cantidad_stock : newProduct.cantidad_stock}
                onChange={(e) =>
                  editingProduct
                    ? setEditingProduct({ ...editingProduct, cantidad_stock: e.target.value })
                    : setNewProduct({ ...newProduct, cantidad_stock: e.target.value })
                }
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={editingProduct ? handleUpdateProduct : handleCreateProduct}
                className="bg-green-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-600 transition"
              >
                {editingProduct ? 'Actualizar Producto' : 'Crear Producto'}
              </button>
              {editingProduct && (
                <button
                  onClick={() => setEditingProduct(null)}
                  className="bg-gray-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-gray-600 transition"
                >
                  Cancelar
                </button>
              )}
            </div>
          </div>
        )}

        {/* Barra de búsqueda por ID */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Buscar Producto por ID</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Ingresa el ID del producto"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="flex-1 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={fetchProductById}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              Buscar
            </button>
          </div>
        </div>

        {/* Detalles del producto o lista de productos */}
        {selectedProduct ? (
          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Detalles del Producto</h2>
            <p><strong>Nombre:</strong> {selectedProduct.nombre}</p>
            <p><strong>Descripción:</strong> {selectedProduct.descripcion}</p>
            <p><strong>Precio:</strong> ${selectedProduct.precio}</p>
            <p><strong>Cantidad en Stock:</strong> {selectedProduct.cantidad_stock}</p>
            <p><strong>Fecha de Creación:</strong> {new Date(selectedProduct.fecha_creacion).toLocaleDateString()}</p>
            <button
              onClick={() => setSelectedProduct(null)} // Volver a la lista de productos
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Volver
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Lista de Productos</h2>
            {loading ? (
              <div className="text-center text-xl text-gray-700">Cargando...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-lg rounded-lg">
                  <thead>
                    <tr>
                      <th className="py-4 px-6 bg-blue-500 text-white text-left">ID</th>
                      <th className="py-4 px-6 bg-blue-500 text-white text-left">Nombre</th>
                      <th className="py-4 px-6 bg-blue-500 text-white text-left">Descripción</th>
                      <th className="py-4 px-6 bg-blue-500 text-white text-left">Precio</th>
                      <th className="py-4 px-6 bg-blue-500 text-white text-left">Cantidad en Stock</th>
                      <th className="py-4 px-6 bg-blue-500 text-white text-left">Fecha de Creación</th>
                      {role === 'Admin' && (
                        <th className="py-4 px-6 bg-blue-500 text-white text-left">Acciones</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-100">
                        <td className="py-4 px-6">{product.id}</td>
                        <td className="py-4 px-6">{product.nombre}</td>
                        <td className="py-4 px-6">{product.descripcion}</td>
                        <td className="py-4 px-6">${product.precio}</td>
                        <td className="py-4 px-6">{product.cantidad_stock}</td>
                        <td className="py-4 px-6">
                          {new Date(product.fecha_creacion).toLocaleDateString()}
                        </td>
                        {role === 'Admin' && (
                          <td className="py-4 px-6 flex gap-4">
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                            >
                              Eliminar
                            </button>
                          </td>
                        )}
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

export default Products;