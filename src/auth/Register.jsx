import { useState } from 'react';
import api from '../pages/services/api';
import Swal from 'sweetalert2';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [role, setRole] = useState('Usuario'); // Estado para el rol
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordConfirm = (event) => {
    setPasswordConfirm(event.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      Swal.fire({
        icon: 'warning',
        title: '⚠️ Las contraseñas no coinciden. Inténtalo de nuevo.',
      });
      return;
    }

    const userData = {
      nombre: name,
      contraseña: password,
      email: email,
      rol: role,
    };

    try {
      const response = await api.post("users/create", userData);

      console.log(response.status)
      if (response.status === 201) {
        setName('');
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
        setRole('Usuario');
        Swal.fire({
          icon: 'success',
          title: 'Usuario registrado con éxito 🎉',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("🚨 Error en la petición:", error.message);

      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'El correo ya está registrado. Intenta con otro.',
        });
      } else if (error.response && error.response.status === 404) {
        Swal.fire({
          icon: 'error',
          title: 'El correo no está registrado.',
        });
      } else {
        
        Swal.fire({
          icon: 'error',
          title: 'Ocurrió un error. Intenta de nuevo más tarde.',
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Crear cuenta</h2>
        <p className="text-center text-gray-600 mb-4">Regístrate para comenzar</p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none mt-2"
              placeholder="Ingresa tu nombre"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none mt-2"
              placeholder="Ingresa tu correo"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none mt-2"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
            <input
              type="password"
              value={passwordConfirm}
              onChange={handlePasswordConfirm}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none mt-2"
              placeholder="Confirma tu contraseña"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Rol</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none mt-2"
              required
            >
              <option value="Admin">Admin</option>
              <option value="Usuario">Usuario</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Registrarse'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <a href="/" className="text-green-500 hover:underline">
              Inicia sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;