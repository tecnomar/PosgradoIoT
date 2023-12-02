(function() {
    "use strict";
    listarSensores();
    
    $('#btn_Limpiar').on('click', function() {
        document.getElementById('form_sensores').reset();
        document.getElementById('guardarModificarSensor').text = "Guardar";
    });

    $('#guardarModificarSensor').on('click', function() {
        // 'let sensorId = document.getElementById("SensorId").value;
        let descripcion = document.getElementById("Descripcion").value;
        let minimo = document.getElementById("Minimo").value;
        let maximo = document.getElementById("Maximo").value;
        
        
        if( descripcion == "" || minimo == "" || maximo == ""){
                swal({
                    title: "Postgrado IOT",
                    text: "Ingrese los campos obligatorios",
                    icon: "warning",
                    button: "Ok",
                }); 
        } else {

            guardarModificarSensor();
        }
    });
})()

//===============================================================================
//  Loguearse
//===============================================================================
function editarSensor(SensorId, Descripcion, Minimo, Maximo, Alerta){
    document.getElementById('SensorId').value = SensorId;
    document.getElementById('Descripcion').value = Descripcion;
    document.getElementById('Minimo').value = Minimo;
    document.getElementById('Maximo').value = Maximo;
    document.getElementById('Alerta').value = Alerta;


    document.getElementById('guardarModificarSensor').text = "Modificar";

    // Mostrar formulario para Editar
    let textoCollapse = document.getElementById('textoCollapse');
    if (textoCollapse.textContent == "Mostrar Formulario"){
        textoCollapse.innerHTML = "Ocultar Formulario";
        $("#form_sensores").addClass("collapse show");
        $('.btn_collapse').children("i").toggleClass("bi bi-arrow-down-square").toggleClass("bi bi-arrow-up-square");
    } 
    
    document.body.scrollIntoView();
}

function guardarModificarSensor(){
    let formData = new FormData(document.getElementById('form_sensores'));
    // 'for (let key of formData.keys()){
    //     console.log(`${key}: ${formData.get(key).toString}`);
    // }
    $.ajax({
        type: "post",
        url: "ajax.php?mode=insertUpdateSensor",
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
                listarSensores();
                document.getElementById('form_sensores').reset();
                document.getElementById('guardarModificarSensor').text = "Guardar";
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

function listarSensores(){
    $.ajax({
        type: "post",
        url: "ajax.php?mode=consultarSensores",
        data: "id="+"",
        beforeSend: function () {
            document.getElementById('modal_preloader').style.display = "block";
        },
        success: function(response) {
            // 'console.log(response);
            if (response != null){
                document.getElementById('tablaSensor').innerHTML = response;
                $('#listar_sensores').DataTable({
                    destroy: true,
                    language: {
                        "decimal": "",
                        "emptyTable": "No hay información",
                        "info": "Mostrando _START_ a _END_ de _TOTAL_ Sensores",
                        "infoEmpty": "Mostrando 0 to 0 of 0 Sensores",
                        "infoFiltered": "(Filtrado de _MAX_ total Sensores)",
                        "infoPostFix": "",
                        "thousands": ",",
                        "lengthMenu": "Mostrar _MENU_ Sensores",
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
                $('#listar_sensores').DataTable( {
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
function preguntarEliminarSensor(SensorId){
    swal({
        title: "Esta seguro?",
        text: "Una vez eliminado no podrá recuperarlo!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            eliminarSensor(SensorId);
        } else {
            swal("Accion de eliminar Cancelada!");
        }
    });
}
function eliminarSensor(SensorId){
    $.ajax({
        type: "post",
        url: "ajax.php?mode=eliminarSensor",
        data: "SensorId="+SensorId,
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
                    listarSensores();
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