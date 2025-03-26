# Proyecto Frontend - Prueba Técnica

Este proyecto es la interfaz de usuario frontend de la prueba técnica para la gestión de productos y su integración con el backend de la aplicación. A través de este frontend, los administradores pueden gestionar productos, mientras que los usuarios pueden buscar productos específicos por ID.

### 1. **Gestión de Productos (Admin)**
- **Crear Producto:** Los administradores pueden agregar nuevos productos al sistema proporcionando un nombre, descripción, precio, y cantidad en stock.
- **Editar Producto:** Los administradores pueden editar productos existentes.
- **Eliminar Producto:** Los administradores pueden eliminar productos.
  
### 2. **Búsqueda de Productos (Todos los usuarios)**
- Los usuarios pueden buscar productos ingresando un ID en un campo de búsqueda.
  
### 3. **Detalles del Producto**
- Al buscar un producto por ID, los usuarios verán los detalles del producto seleccionado, que incluyen:
  - Nombre
  - Descripción
  - Precio
  - Cantidad en stock
  - Fecha de creación
  
### 4. **Interfaz de Usuario**
- **Responsive:** La aplicación es completamente funcional en dispositivos móviles, tabletas y escritorios.
- **Diseño limpio:** La interfaz es sencilla y fácil de usar, con formularios claros y botones intuitivos.
- **Colores:** Se utiliza una paleta de colores sobria con tonos de gris, verde y azul.

## Tecnologías Utilizadas

- **React:** Biblioteca principal utilizada para construir la interfaz de usuario.
- **Tailwind CSS:** Framework de diseño para crear una interfaz limpia y responsiva.
- **State Management:** React `useState` para manejar los estados de los productos y formularios.
- **Axios:** Para realizar las solicitudes HTTP al backend.

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
