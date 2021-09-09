const { request } = require('express');
const mysql = require('mysql');

const { promisify } = require('util');

const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONECTION_LOST') {
            console.log('Conexion de BD fue cerrada');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.log('La DB tiene muchas conecciones');
        }
        if (err.code === 'ECONNREFUSED') {
            console.log('La conexion a la BD ha sido rechazada');
        }
    }

    if (connection) connection.release();
        console.log('BD esta conectada');
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;