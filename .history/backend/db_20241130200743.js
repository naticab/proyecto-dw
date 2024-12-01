const mysql = require('mysql');

// Configuración de la conexión
const connection = mysql.createConnection({
    host: 'localhost', // Cambia esto si MariaDB no está en localhost
    user: 'root', // Reemplaza con tu usuario de MariaDB
    password: '1234', // Reemplaza con tu contraseña de MariaDB
    database: 'Unamed/entregafinal', // Cambia esto por el nombre de tu base de datos
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.message);
        return;
    }
    console.log('Conectado a la base de datos MariaDB.');
});

module.exports = connection;
