//************************** */
//funciones de sistema 
//************************** */


//funcion salir del sistema
function salir() {
  var resultado = window.confirm("Estas segur@ de salir?");

  if (resultado === true) {
    window.location = "/logout";
  }
};

//salir de sistema
function salirSistema1() {
  Swal.fire({
    title: "Estas segur@ de Salir?",
    //text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Salir",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location = "/logout";
    }
  });
}

//salir de sistema alertify
function salirSistema() {
  alertify.confirm('Ayala Transmisiones Automáticas - App Taller', 
  'Esta segur@ de salir del Sistema ?', 
  function(){ 
    window.location = "/logout";
    //alertify.success('Ok') 
  }, 
  function(){ alertify.error('Cancel')});
Run
}


//************************** */
//funciones de creacion de usuarios
//************************** */

//mostrar password en input typed
function mPassword(pass) {
  var cambio = document.getElementById(pass); 
  if (cambio.type == "password") {
    cambio.type = "text";
    $("." + pass).removeClass("fa fa-eye-slash").addClass("fa fa-eye");
  } else {
    cambio.type = "password";
    $("." + pass).removeClass("fa fa-eye").addClass("fa fa-eye-slash");
  }
}


// function mostrarPassword() {
//   var cambio = document.getElementById("password");

//   if (cambio.type == "password") {
//     cambio.type = "text";
//     $(".icon").removeClass("fa fa-eye-slash").addClass("fa fa-eye");
//   } else {
//     cambio.type = "password";
//     $(".icon").removeClass("fa fa-eye").addClass("fa fa-eye-slash");
//   }
// }

//mostrar password 2 nuevo usuario
// function mostrarPassword2() {
//     var cambio = document.getElementById("password2");
//     if (cambio.type == "password") {
//       cambio.type = "text";
//       $(".icon2").removeClass("fa fa-eye-slash").addClass("fa fa-eye");
//     } else {
//       cambio.type = "password";
//       $(".icon2").removeClass("fa fa-eye").addClass("fa fa-eye-slash");
//     }
//   }


//************************** */
//fuciones para formularios
//************************** */

//funcion para eliminar registros   
function EliminaRegistro(id, tipo) {
  alertify.confirm('Ayala Transmisiones Automáticas - App Taller', 
  'Estas Segur@ de eliminar el ' +tipo+ ' con el id: ' +id+ ' ?', 
  function(){ 
    if (tipo == 'cliente') {
      window.location = '/clientes/delete/'+id;
    }
    if (tipo == 'vehiculo') {
      window.location = '/vehiculos/delete/'+id;
    }
    //alertify.success('Ok') 
  }, 
  function(){ alertify.error('Cancel')});
Run
}


//funcion para habilitar elementos en la edicion y creacion de clientes
function habilita(value) {
  if (value == true){
      //document.getElementById("nom_fac").disabled = true;
      document.getElementById("fac").hidden = true;
  }else if (value == false){
      //document.getElementById("nom_fac").disabled = false;
      document.getElementById("fac").hidden = false;
      document.getElementById("nom_fac").value = "";
      document.getElementById("dir_fac").value = "";
      document.getElementById("col_fac").value = "";
      document.getElementById("ciu_fac").value = "";
      document.getElementById("tel_fac").value = "";
      document.getElementById("cp_fac").value = "";
  }
}

   
