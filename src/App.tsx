import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './auth/Login'; // Asumiendo que tienes un archivo Inicio.tsx
import Register from './auth/Register'; // Asumiendo que tienes un archivo Inicio.tsx
import Dashboard from './pages/Admin/dashboard'; // Asumiendo que tienes un archivo Orders.tsx
import Orders from './pages/Admin/orders'; // Asumiendo que tienes un archivo Orders.tsx
import Products from './pages/Admin/products'; // Asumiendo que tienes un archivo Orders.tsx

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
};

export default App;
