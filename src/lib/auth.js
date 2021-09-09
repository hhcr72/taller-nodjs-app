//conexion
const pool = require("../database");

module.exports = {
  isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect("/signin");
  },

  isNotLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    return res.redirect("/profile");
  },

  //validacion de registro de usuario
  async validatingData(req, res, next) {
    //obtengo los valores del req.body
    const errors = [];
    const { username, fullname, password, password2 } = req.body;

    //verifico que coincidan contraseñas
    if (password != password2) {
      errors.push({text: 'Las contraseñas no coiciden'});
      res.render('auth/signup', {errors, username, fullname});
    };

    //busco usuario
    const rows = await pool.query(
      "select * FROM users WHERE username = ?",
      username
    );
    
    //verifico si existe usuario
    if (rows.length > 0) {
      errors.push({ text: "El usuario ya existe" });
      res.render("auth/signup", { errors, username, fullname });
    }    
    return next()
  }
};
