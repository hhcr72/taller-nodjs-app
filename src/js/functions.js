//funcion salir del sistema
function salir() {
    var resultado = window.confirm('Estas segur@ de salir?');

    if (resultado === true) {
        window.location = '/logout';
    }

}

//salir de sistema
function salirSistema() {
    Swal.fire({
        title: 'Estas segur@ de Salir?',
        //text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Salir'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location = '/logout';
        }
    })
}