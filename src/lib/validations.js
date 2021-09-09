//conexion
const pool = require("../database");

module.exports = {

    //valido si pueden borra clientes, vehiculos
    async validationDelete(req, res, next) {
        const errors = [];
        const {id} = req.params;
        const tipo = req.baseUrl;
       
        //cliente
        if (tipo.substr(1) == 'clientes') {
            //creo cunsulta
            const rows = await pool.query("select id_veh, id_cliente from vehiculos where id_cliente = ?", id);
            // verifico si tiene vehiculos
            if (rows.length > 0) {     
                req.flash('success', 'El cliente con id ' + id + ' no se puede eliminar, tiene vehiculos registrados');
                res.redirect('/vehiculos/dis/'+rows[0].id_cliente);
            } else { return next(); }   
        } 

        //vehiculos
        if (tipo.substr(1) == 'vehiculos') {
            //creo cunsulta
            console.log(id);      
            const rows = await pool.query("select id_veh, id_cliente from orden where id_veh = ?", id);
            console.log(rows);
            // verifico si tiene reparaciones el vehiculos
            if (rows.length > 0) {     
                req.flash('success', 'El vehiculo con id ' + id + ' no se puede eliminar ya que tiene historial de reparaciones');
                res.redirect('/vehiculos/dis/'+rows[0].id_cliente);
            } else { return next(); }   
        } 

    
    }

}
