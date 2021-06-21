const express = require('express');
const { listenerCount } = require('../database');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

//muestra vehiculos
router.get('/', isLoggedIn, async (req, res) => {
    const vehiculos = await pool.query('SELECT vehiculos.*, clientes.nombre FROM vehiculos inner join clientes on vehiculos.id_cliente = clientes.id_cliente order by clientes.id_cliente');
    res.render('vehiculos/vehiculos', { vehiculos });
});

//muestra formulario de captura de vehiculos
//router.get('/add/:id', isLoggedIn, (req, res) => {
//res.render('vehiculos/add');
//});

//muestra formulario de captura de vehiculos
router.get('/dis/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params
    const veh = await pool.query('SELECT clientes.nombre, clientes.direccion, clientes.colonia, clientes.ciudad, clientes.telefono, clientes.celular, vehiculos.* FROM clientes INNER JOIN vehiculos ON clientes.id_cliente = vehiculos. id_cliente WHERE clientes.id_cliente = ? ORDER BY vehiculos.id_veh', [id]);
    res.render('vehiculos/dis', { veh });
});

//editar vehiculo
router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params
    const vehe = await pool.query('SELECT vehiculos.*, clientes.nombre, clientes.direccion, clientes.colonia, clientes.ciudad, clientes.telefono, clientes.celular  from vehiculos LEFT JOIN clientes ON vehiculos.id_cliente = clientes.id_cliente WHERE vehiculos.id_veh = ?', [id]);
    //res.render('vehiculos/edit', { vehe: vehed[0] });
    console.log(vehed);
    res.render('vehiculos/edit', { 
        vehed
     });
})

module.exports = router;
