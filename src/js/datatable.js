$(document).ready(function () {
    $('#MyTable').DataTable({
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por página",
            "zeroRecords": "No se encontraro Registros",
            "info": "Mostrando página _PAGE_ de _PAGES_",
            "infoEmpty": "Sin Registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "search": "Buscar:",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "loadingRecords": "Cargando...",
            "infoThousands": ",",
        },
        //dom: 'frBtpil',
        dom: 'Birtpl',

        
        buttons: [
            {
                extend: 'excelHtml5',
                text: '<img src="/img/excel-24.png">',
                titleAttr: 'Exportar a Excel',
                className: 'btn btn-succes'
            },
            {
                extend: 'pdfHtml5',
                text: '<img src="/img/pdf-24.png">',
                titleAttr: 'Exportar a PDF',
                className: 'btn btn-danger'
            },
            {
                extend: 'print',
                text: '<img src="/img/print-24.png">',
                titleAttr: 'Imprimir',
                className: 'btn btn-info'
            }]

    });
});