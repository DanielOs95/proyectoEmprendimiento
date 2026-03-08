// Simula base de datos de usuarios
const usuarios = [
  {
    email: "admin@superexpres.com",
    password: "123456", // en producción debería ir hashed
    nombre: "Administrador"
  }
];

// Exportar para poder usarlo en login.js
export { usuarios };