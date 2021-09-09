const express = require('express');
const { listenerCount } = require('../database');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const { validationDelete } = require('../lib/validations');

//muestra vehiculos
router.get('/', isLoggedIn, async (req, res) => {
    const vehiculos = [];
    res.render('vehiculos/listar', {vehiculos});
});

//muestra busqueda de vehiculos
router.get('/search/:valor_busqueda', isLoggedIn, async (req, res) => {
    const {valor_busqueda} = req.params;
    const vehiculos = await pool.query('SELECT vehiculos.*, clientes.nombre ' +
    'FROM ' +
    'vehiculos inner join clientes on vehiculos.id_cliente = clientes.id_cliente ' +
    'WHERE ' +
    'vehiculos.id_veh like "%'+ [valor_busqueda] + '%" ' +
    'or concat_ws(" ", vehiculos.marca, vehiculos.tipo, vehiculos.modelo, vehiculos.color) like "%'+ [valor_busqueda] + '%"' +
    'or concat_ws(" ", vehiculos.marca, vehiculos.tipo, vehiculos.color) like "%'+ [valor_busqueda] + '%"' +
    'or concat_ws(" ", vehiculos.marca, vehiculos.color) like "%'+ [valor_busqueda] + '%"' +
    'or concat_ws(" ", vehiculos.tipo, vehiculos.modelo, vehiculos.color) like "%'+ [valor_busqueda] + '%"' +
    'or concat_ws(" ", vehiculos.tipo, vehiculos.color) like "%'+ [valor_busqueda] + '%"' +
    'or concat_ws(" ", vehiculos.tipo, vehiculos.marca) like "%'+ [valor_busqueda] + '%"' +
    'or vehiculos.serie like "%'+ [valor_busqueda] + '%" ' +
    'or vehiculos.placas like "%'+ [valor_busqueda] + '%" ' +
    
    'order by nombre desc');

    if (vehiculos.length === 0) { 
        req.flash('success', 'La busqueda esta vacia');
        res.redirect('/vehiculos');
    } else {
        res.render('vehiculos/listar', { vehiculos });
    }
});

//muestra formulario de captura de vehiculos
//router.get('/add/:id', isLoggedIn, (req, res) => {
//res.render('vehiculos/add');
//});

//muestra formulario de captura de vehiculos
router.get('/dis/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params
    const veh = await pool.query('SELECT clientes.id_cliente, clientes.nombre, clientes.direccion, clientes.colonia, clientes.ciudad, clientes.telefono, clientes.celular, vehiculos.id_veh, vehiculos.marca, vehiculos.tipo, vehiculos.color, vehiculos.modelo, vehiculos.serie, vehiculos.placas, vehiculos.observaciones FROM clientes LEFT JOIN vehiculos ON clientes.id_cliente = vehiculos. id_cliente WHERE clientes.id_cliente = ? ORDER BY vehiculos.id_veh', [id]);
    res.render('vehiculos/dis', { veh });
});

//editar vehiculo
router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params 
    const vehiculo = await pool.query('SELECT vehiculos.*, clientes.nombre, clientes.direccion, clientes.colonia, clientes.ciudad, clientes.telefono, clientes.celular  from vehiculos LEFT JOIN clientes ON vehiculos.id_cliente = clientes.id_cliente WHERE vehiculos.id_veh = ?', [id]);
    //res.render('vehiculos/edit', { vehe: vehed[0] });
    res.render('vehiculos/edit', { vehiculo });
})

//borra vehiculo
router.get('/delete/:id', isLoggedIn,  validationDelete, async (req, res) => {
    const { id } = req.params;
    const rows = await pool.query('SELECT id_cliente FROM vehiculos WHERE id_veh = ?', [id]);
    await pool.query('DELETE FROM vehiculos WHERE id_veh = ?', [id]);
    req.flash('success', 'Vehiculo eliminado correctamente');
    res.redirect('/vehiculos/dis/'+rows[0].id_cliente);
});

//agrega nuevo vehiculo
router.post('/add', isLoggedIn, async (req, res) => {
    //const {id_cliente} = req.params
    const {
        id_cliente,
        marca,
        tipo,
        color,
        modelo,
        serie,
        placas,
        observaciones
    } = req.body;
    const nuevoVehiculo = {
        id_cliente,
        marca,
        tipo,
        color,
        modelo,
        serie,
        placas,
        observaciones
    };
    await pool.query('INSERT INTO vehiculos set ?', [nuevoVehiculo]);
    req.flash('success', 'Vehiculo Guardado correctamente');
    res.redirect('/vehiculos/dis/'+[id_cliente]);
});


//actualizar vehiculo
router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const {
        marca,
        tipo,
        color,
        modelo,
        serie,
        placas,
        observaciones
    } = req.body;
    const ActualizaDatos = {
        marca,
        tipo,
        color,
        modelo,
        serie,
        placas,
        observaciones
    };
    const rows = await pool.query('SELECT id_cliente FROM vehiculos WHERE id_veh = ?', [id]);
    await pool.query('UPDATE vehiculos set ? WHERE id_veh = ?', [ActualizaDatos, id]);
    req.flash('success', 'Vehiculo Actualizado correctamente');
    res.redirect('/vehiculos/dis/'+rows[0].id_cliente);
});

module.exports = router;
