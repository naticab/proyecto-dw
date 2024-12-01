const mysql = require('mysql');

// Configuración de la conexión
const connection = mysql.createConnection({
    host: 'localhost', // Cambia esto si MariaDB no está en localhost
    user: 'root',
    password: '1234',
    database: 'Unamed/entregafinal',
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
