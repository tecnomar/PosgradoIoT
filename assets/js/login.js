(function() {
    "use strict";
    // Selecciona el formulario por su ID
    let formulario = document.getElementById("login");

    // Agrega un controlador de evento para el evento "submit"
    formulario.addEventListener("submit", function(event) {
        // Previene la acción predeterminada de envío del formulario
        event.preventDefault();

        // Aquí puedes realizar lógica personalizada antes de enviar el formulario

        // Por ejemplo, puedes validar los datos del formulario
        let usuario = formulario.elements["usuario"].value;
        let password = formulario.elements["password"].value;
        
    
        if( usuario == "" || password == ""){
                swal({
                    title: "Postgrado IOT",
                    text: "Ingrese los campos obligatorios",
                    icon: "warning",
                    button: "Ok",
                }); 
        } else {

            loguearse(usuario, password);
        }
    });
})()

//===============================================================================
//  Loguearse
//===============================================================================
function loguearse(Usuario, Password){
    $.ajax({
        type: "post",
        url: "ajax.php?mode=login",
        data: "Usuario="+Usuario+"&Password="+Password,
        beforeSend: function () {
            document.getElementById('modal_preloader').style.display = "block";
        },
        success: function(response) {
            console.log(response);
            if (response.status){
                let link = 'index';
                document.location.href = link;
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