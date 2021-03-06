const { Router } = require('express');
const express = require('express');
const passport = require('passport');
const router = express.Router();
const pool = require('../database');    

const { isLoggedIn, isNotLoggedIn, validatingData } = require('../lib/auth');

router.get('/signup', isLoggedIn,  (req, res) => {
    res.render('auth/signup');
});

 router.post('/signup', isLoggedIn, validatingData, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup', 
    failureFlash: true
}));

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true        
    })(req, res, next);
});

router.get('/profile', isLoggedIn, (req, res) => {   
    res.render('profile');
}); 

router.get('/logout', (req, res) => {   
    req.logOut();
    res.redirect('/signin')
}); 


module.exports = router;