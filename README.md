# Proyecto Frontend - Prueba Técnica

Este proyecto es la interfaz de usuario frontend de la prueba técnica para la gestión de productos y su integración con el backend de la aplicación. A través de este frontend, los administradores pueden gestionar productos, mientras que los usuarios pueden buscar productos específicos por ID.

## Arquitectura del Proyecto

El frontend está construido con **React** y está diseñado para ser completamente **responsive** utilizando **Tailwind CSS** para los estilos. La aplicación se comunica con un backend a través de peticiones HTTP usando **Axios**.

### Estructura de Carpetas

La estructura del proyecto es la siguiente:

```bash
src/
├── components/          # Componentes reutilizables de React
│   ├── ProductForm.js   # Componente para crear y editar productos
│   ├── ProductList.js   # Componente para mostrar la lista de productos
│   └── ProductSearch.js # Componente para buscar productos por ID
├── services/            # Lógica de interacción con la API backend
│   ├── api.js           # Funciones para manejar solicitudes HTTP
├── App.js               # Componente principal de la aplicación
├── index.js             # Punto de entrada de la aplicación
└── styles/              # Archivos de estilo (Tailwind CSS)
