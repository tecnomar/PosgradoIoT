(function() {
    "use strict";
    listarUsuarios();
    $('#btn_Limpiar').on('click', function() {
        document.getElementById('form_usuarios').reset();
        document.getElementById('guardarModificarUsuario').text = "Guardar";
    });
    $('#guardarModificarUsuario').on('click', function() {
        // 'let usuarioId = document.getElementById("usuarioId").value;
        let usuario = document.getElementById("usuario").value;
        let nombre = document.getElementById("nombre").value;
        let password = document.getElementById("password").value;
        
        
        if( usuario == "" || password == "" || nombre == ""){
                swal({
                    title: "Postgrado IOT",
                    text: "Ingrese los campos obligatorios",
                    icon: "warning",
                    button: "Ok",
                }); 
        } else {

            guardarModificarUsuario();
        }
    });
})()

//===============================================================================
//  Loguearse
//===============================================================================
function editarUsuario(idUsuario, nombreUsuario, nombreLargo){
    document.getElementById('usuarioId').value = idUsuario;
    document.getElementById('usuario').value = nombreUsuario;
    document.getElementById('nombre').value = nombreLargo;

    document.getElementById('guardarModificarUsuario').text = "Modificar";

    // Mostrar formulario para Editar
    let textoCollapse = document.getElementById('textoCollapse');
    if (textoCollapse.textContent == "Mostrar Formulario"){
        textoCollapse.innerHTML = "Ocultar Formulario";
        $("#form_usuarios").addClass("collapse show");
        $('.btn_collapse').children("i").toggleClass("bi bi-arrow-down-square").toggleClass("bi bi-arrow-up-square");
    } 
    
    document.body.scrollIntoView();
}

function guardarModificarUsuario(){
    let formData = new FormData(document.getElementById('form_usuarios'));
    // 'for (let key of formData.keys()){
    //     console.log(`${key}: ${formData.get(key).toString}`);
    // }
    $.ajax({
        type: "post",
        url: "ajax.php?mode=insertUpdateUsuario",
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
                listarUsuarios();
                document.getElementById('form_usuarios').reset();
                document.getElementById('guardarModificarUsuario').text = "Guardar";
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

function listarUsuarios(){
    $.ajax({
        type: "post",
        url: "ajax.php?mode=consultarUsuarios",
        data: "id="+"",
        beforeSend: function () {
            document.getElementById('modal_preloader').style.display = "block";
        },
        success: function(response) {
            // 'console.log(response);
            if (response != null){
                document.getElementById('tablaUsuario').innerHTML = response;
                $('#listar_usuarios').DataTable({
                    destroy: true,
                    language: {
                        "decimal": "",
                        "emptyTable": "No hay información",
                        "info": "Mostrando _START_ a _END_ de _TOTAL_ Usuarios",
                        "infoEmpty": "Mostrando 0 to 0 of 0 Usuarios",
                        "infoFiltered": "(Filtrado de _MAX_ total Usuarios)",
                        "infoPostFix": "",
                        "thousands": ",",
                        "lengthMenu": "Mostrar _MENU_ Usuarios",
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
                $('#listar_usuarios').DataTable( {
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
function preguntarEliminarUsuario(UsuarioId){
    swal({
        title: "Esta seguro?",
        text: "Una vez eliminado no podrá recuperarlo!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            eliminarUsuario(UsuarioId);
        } else {
            swal("Accion de eliminar Cancelada!");
        }
    });
}
function eliminarUsuario(UsuarioId){
    $.ajax({
        type: "post",
        url: "ajax.php?mode=eliminarUsuario",
        data: "UsuarioId="+UsuarioId,
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
                    listarUsuarios();
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