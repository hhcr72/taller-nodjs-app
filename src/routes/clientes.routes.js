const express = require('express');
const { listenerCount } = require('../database');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const { validationDelete } = require('../lib/validations');

//muestra formulario de captura de cliente
router.get('/add', isLoggedIn, (req, res) => {
    res.render('clientes/add');
});

//muestra busqueda de clientes
router.get('/', isLoggedIn, async (req, res) => {
    const clientes = [];
    res.render('clientes/listar', {clientes});
});

//muestra clientes filtro
router.get('/search/:valor_busqueda', isLoggedIn, async (req, res) => {
    const {valor_busqueda} = req.params;
    const clientes = await pool.query('SELECT * FROM clientes where id_cliente like "'+ [valor_busqueda] + '%" or nombre like "%'+ [valor_busqueda] + '%" order by nombre desc');
    if (clientes.length === 0) { 
        
        //alert_busqueda_vacia();
        //alertify.success('Ok') 
        req.flash('success', 'La busqueda esta vacia');
        res.redirect('/clientes');
    } else {
        res.render('clientes/listar', { clientes });
    }
});


//borra cliente
router.get('/delete/:id', isLoggedIn, validationDelete, async (req, res, next) => {
    const {id} = req.params;
    await pool.query('DELETE FROM clientes WHERE id_cliente = ?', [id]);
    req.flash('success', 'Cliente eliminado correctamente hh');
    res.redirect('/clientes');
});

//agrega nuevo cliente
router.post('/add', isLoggedIn, async (req, res) => {
    //console.log('registro nuevo');
    const {
        nombre,
        direccion,
        colonia,
        cp,
        ciudad,
        telefono,
        celular,
        nom_fac,
        dir_fac,
        col_fac,
        cp_fac,
        ciu_fac,
        tel_fac,
        rfc_fac,
        obs,
        datfac
    } = req.body;
    const nuevoCliente = {
        nombre,
        direccion,
        colonia,
        cp,
        ciudad,
        telefono,
        celular,
        nom_fac,
        dir_fac,
        col_fac,
        cp_fac,
        ciu_fac,
        tel_fac,
        rfc_fac,
        obs,
        datfac
    };

    await pool.query('INSERT INTO clientes set ?', [nuevoCliente]);
    req.flash('success', 'Cliente Guardado correctamente');
    res.redirect('/clientes');
});

//edita cliente
router.get('/edit/:id', isLoggedIn, async (req, res, next) => {
    //console.log('entre');
    const {
        id
    } = req.params;
    const clientes = await pool.query('SELECT * FROM clientes WHERE id_cliente = ?', [id]);
    res.render('clientes/edit', {
        cliente: clientes[0]
    });
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    // console.log('entro a guardar mod');
    const {
        id
    } = req.params;
    const {
        nombre,
        direccion,
        colonia,
        cp,
        ciudad,
        telefono,
        celular,
        nom_fac,
        dir_fac,
        col_fac,
        cp_fac,
        ciu_fac,
        tel_fac,
        rfc_fac,
        obs,
        datfac
    } = req.body;
    const ActualizaDatos = {
        nombre,
        direccion,
        colonia,
        cp,
        ciudad,
        telefono,
        celular,
        nom_fac,
        dir_fac,
        col_fac,
        cp_fac,
        ciu_fac,
        tel_fac,
        rfc_fac,
        obs,
        datfac
    };
    await pool.query('UPDATE clientes set ? WHERE id_cliente = ?', [ActualizaDatos, id]);
    req.flash('success', 'Cliente Actualizado correctamente');
    res.redirect('/clientes');
});


module.exports = router;