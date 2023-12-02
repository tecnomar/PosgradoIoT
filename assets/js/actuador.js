(function() {
    "use strict";
    listarActuadores();
    
    $('#btn_Limpiar').on('click', function() {
        document.getElementById('form_actuadores').reset();
        document.getElementById('guardarModificarActuador').text = "Guardar";
    });

    $('#guardarModificarActuador').on('click', function() {
        //'let actuadorId = document.getElementById("ActuadorId").value;
        let descripcion = document.getElementById("Descripcion").value;
        let estado = document.getElementById("Estado").value;
        
        
        if( descripcion == "" || estado == ""){
                swal({
                    title: "Postgrado IOT",
                    text: "Ingrese los campos obligatorios",
                    icon: "warning",
                    button: "Ok",
                }); 
        } else {

            guardarModificarActuador();
        }
    });
})()

//===============================================================================
//  Loguearse
//===============================================================================
function editarActuador(ActuadorId, Descripcion, Estado){
    document.getElementById('ActuadorId').value = ActuadorId;
    document.getElementById('Descripcion').value = Descripcion;
    document.getElementById('Estado').value = Estado;


    document.getElementById('guardarModificarActuador').text = "Modificar";

    // Mostrar formulario para Editar
    let textoCollapse = document.getElementById('textoCollapse');
    if (textoCollapse.textContent == "Mostrar Formulario"){
        textoCollapse.innerHTML = "Ocultar Formulario";
        $("#form_actuadores").addClass("collapse show");
        $('.btn_collapse').children("i").toggleClass("bi bi-arrow-down-square").toggleClass("bi bi-arrow-up-square");
    } 
    
    document.body.scrollIntoView();
}

function guardarModificarActuador(){
    let formData = new FormData(document.getElementById('form_actuadores'));
    // 'for (let key of formData.keys()){
    //     console.log(`${key}: ${formData.get(key).toString}`);
    // }
    $.ajax({
        type: "post",
        url: "ajax.php?mode=insertUpdateActuador",
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        beforeSend: function () {
            document.getElementById('modal_preloader').style.display = "block";
        },
        success: function(response) {
            // 'console.log(response);
            if (response.status){
                swal({
                    title: "Postgrado IOT",
                    text: response.msg,
                    closeOnClickOutside: false,
                    icon: "success",
                    button: "Ok",
                });
                listarActuadores();
                document.getElementById('form_actuadores').reset();
                document.getElementById('guardarModificarActuador').text = "Guardar";
            } else {
                swal({
                    title: "Postgrado IOT",
                    text: response.msg,
                    closeOnClickOutside: false,
                    icon: "warning",
                    button: "Ok",
                });
            }
            document.getElementById('modal_preloader').style.display = "none";
        },
        complete : function(xhr, status) {
            
        }
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        console.log(jqXHR.responseText);
        let errores = "";
        if (jqXHR.status === 0) {
            errores = 'No conecta: Verificar la red.';
        } else if (jqXHR.status == 404) {
            errores = 'Página solicitada no encontrada [404]';
        } else if (jqXHR.status == 500) {
            errores = 'Error interno del servidor [500].';
        } else if (textStatus === 'parsererror') {
            errores = 'Error al analizar JSON solicitado.';
        } else if (textStatus === 'timeout') {
            errores = 'Error de tiempo de espera.';
        } else if (textStatus === 'abort') {
            errores = 'Petición de Ajax abortada.';
        } else {
            errores = 'Error no detectado: ' + jqXHR.responseText;
        }
        swal({
            title: "Postgrado IOT",
            text: errores,
            closeOnClickOutside: false,
            icon: "warning",
            button: "Ok",
        }); 
        document.getElementById('modal_preloader').style.display = "none";
    });
}

function listarActuadores(){
    $.ajax({
        type: "post",
        url: "ajax.php?mode=consultarActuadores",
        data: "id="+"",
        beforeSend: function () {
            document.getElementById('modal_preloader').style.display = "block";
        },
        success: function(response) {
            // 'console.log(response);
            if (response != null){
                document.getElementById('tablaActuador').innerHTML = response;
                $('#listar_actuadores').DataTable({
                    destroy: true,
                    language: {
                        "decimal": "",
                        "emptyTable": "No hay información",
                        "info": "Mostrando _START_ a _END_ de _TOTAL_ Actuadores",
                        "infoEmpty": "Mostrando 0 to 0 of 0 Actuadores",
                        "infoFiltered": "(Filtrado de _MAX_ total Actuadores)",
                        "infoPostFix": "",
                        "thousands": ",",
                        "lengthMenu": "Mostrar _MENU_ Actuadores",
                        "loadingRecords": "Cargando...",
                        "processing": "Procesando...",
                        "search": "Buscar:",
                        "zeroRecords": "Sin resultados encontrados",
                        "paginate": {
                            "first": "Primero",
                            "last": "Ultimo",
                            "next": "Siguiente",
                            "previous": "Anterior"
                        }
                    },
                });
                $('#listar_actuadores').DataTable( {
                    retrieve: true,
                    paging: true,
                    responsive: true
                } );
            } else {
                swal({
                    title: "Postgrado IOT",
                    text: "Error no se ejecutó rel procedimiento",
                    closeOnClickOutside: false,
                    icon: "warning",
                    button: "Ok",
                });
            }
            document.getElementById('modal_preloader').style.display = "none";
        },
        complete : function(xhr, status) {
            
        }
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        console.log(jqXHR.responseText);
        let errores = "";
        if (jqXHR.status === 0) {
            errores = 'No conecta: Verificar la red.';
        } else if (jqXHR.status == 404) {
            errores = 'Página solicitada no encontrada [404]';
        } else if (jqXHR.status == 500) {
            errores = 'Error interno del servidor [500].';
        } else if (textStatus === 'parsererror') {
            errores = 'Error al analizar JSON solicitado.';
        } else if (textStatus === 'timeout') {
            errores = 'Error de tiempo de espera.';
        } else if (textStatus === 'abort') {
            errores = 'Petición de Ajax abortada.';
        } else {
            errores = 'Error no detectado: ' + jqXHR.responseText;
        }
        swal({
            title: "Postgrado IOT",
            text: errores,
            closeOnClickOutside: false,
            icon: "warning",
            button: "Ok",
        }); 
        document.getElementById('modal_preloader').style.display = "none";
    });
}
function preguntarEliminarActuador(ActuadorId){
    swal({
        title: "Esta seguro?",
        text: "Una vez eliminado no podrá recuperarlo!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            eliminarActuador(ActuadorId);
        } else {
            swal("Accion de eliminar Cancelada!");
        }
    });
}
function eliminarActuador(ActuadorId){
    $.ajax({
        type: "post",
        url: "ajax.php?mode=eliminarActuador",
        data: "ActuadorId="+ActuadorId,
        beforeSend: function () {
            document.getElementById('modal_preloader').style.display = "block";
        },
        success: function(response) {
            // 'console.log("respuesta", response);
            if(response != null){
                if(response == 1){
                    swal({
                        title: "Postgrado IOT",
                        text: "Se Eliminó con exito",
                        icon: "success",
                        button: "Ok",
                    }); 
                    listarActuadores();
                } else {
                    swal({
                        title: "Postgrado IOT",
                        text: "No se pudo Eliminar",
                        icon: "error",
                        button: "Ok",
                    }); 
                }
            } else {
                swal({
                    title: "Postgrado IOT",
                    text: "Error al llamar Procedimiento",
                    icon: "error",
                    button: "Ok",
                }); 
            }
            
            document.getElementById('modal_preloader').style.display = "none";
        },
        
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        let errores = "";
        if (jqXHR.status === 0) {
                errores = 'No conecta: Verificar la red.';
        } else if (jqXHR.status == 404) {
                errores = 'Página solicitada no encontrada [404]';
        } else if (jqXHR.status == 500) {
                errores = 'Error interno del servidor [500].';
        } else if (textStatus === 'parsererror') {
                errores = 'Error al analizar JSON solicitado.';
        } else if (textStatus === 'timeout') {
                errores = 'Error de tiempo de espera.';
        } else if (textStatus === 'abort') {
                errores = 'Petición de Ajax abortada.';
        } else {
                errores = 'Error no detectado: ' + jqXHR.responseText;
        }
        swal({
            title: "Postgrado IOT",
            text: errores,
            closeOnClickOutside: false,
            icon: "warning",
            button: "Ok",
        }); 
        document.getElementById('modal_preloader').style.display = "none";
    });
}