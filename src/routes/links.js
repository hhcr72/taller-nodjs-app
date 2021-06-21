const express = require('express');
const { listenerCount } = require('../database');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    const { title, url, description } = req.body;
    const newlink = {
        title,
        url,
        description
    };
    await pool.query('INSERT INTO links set ?', [newlink]);  
    req.flash('success', 'Enlace Guardado correctamente'); 
    res.redirect('/links');
});

router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM links');
    //console.log(links);
    res.render('links/list', { links });
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE id = ?', [id]);
    req.flash('success', 'Enlace Borrado correctamente');
    res.redirect('/links');   
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    //console.log(link[0]);
    res.render('links/edit', { link: links[0] });
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { title, url, description } = req.body;
    const newlink = {
        title,
        url,
        description
    };
    await pool.query('UPDATE links set ? WHERE id = ?', [newlink, id]);
    req.flash('success', 'Enlace Actualizado correctamente');
    res.redirect('/links'); 
});

module.exports = router;