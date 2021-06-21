const express = require('express');
const {
    listenerCount
} = require('../database');
const router = express.Router();
const pool = require('../database');
const {
    isLoggedIn
} = require('../lib/auth');

//muestra formulario de captura de cliente
router.get('/add', isLoggedIn, (req, res) => {
    res.render('clientes/add');
});

//muestra clientes
router.get('/', isLoggedIn, async (req, res) => {
    const clientes = await pool.query('SELECT id_cliente, nombre, direccion, telefono, celular FROM clientes order by nombre');
    res.render('clientes/listar', { clientes });
    //res.render('clientes/listar', '');
});

//borra cliente
router.get('/delete/:id', isLoggedIn, async (req, res) => {
    //console.log('cliente borrado');
    const {
        id
    } = req.params;
    //console.log(id);
    await pool.query('DELETE FROM clientes WHERE id_cliente = ?', [id]);
    //req.flash('success', 'Enlace Borrado correctamente');
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
    req.flash('success', 'Enlace Guardado correctamente');
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