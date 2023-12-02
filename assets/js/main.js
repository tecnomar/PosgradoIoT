/**
* Nombre: Plataforma de Posgrado Untels
*
* Ultima Modificaciòn: Jul 27 2023 with Bootstrap v5.3.1
* Desarrollador: Omar Arturo Torres Peña
* Licencia: Desarrollo Propio para la Untels
*/
(function() {
  "use strict"; 

  //=======================================================================
  //  Cambiar Icono al presionarlo
  //=======================================================================

    $('.btn_collapse').on('click', function () {
      let textoCollapse = document.getElementById('textoCollapse');
      $(this).children("i").toggleClass("bi bi-arrow-down-square").toggleClass("bi bi-arrow-up-square");
      if (textoCollapse.textContent == "Mostrar Formulario"){
          textoCollapse.innerHTML = "Ocultar Formulario";
      } else {
          textoCollapse.innerHTML = "Mostrar Formulario";
      }
    });

    $('.btn_collapse_carga_horaria').on('click', function () {
      let textoCollapse = document.getElementById('textoCollapse_carga_horaria');
      $(this).children("i").toggleClass("bi bi-arrow-down-square").toggleClass("bi bi-arrow-up-square");
      if (textoCollapse.textContent == "Mostrar Sección Principal"){
          textoCollapse.innerHTML = "Ocultar Sección Principal";
      } else {
          textoCollapse.innerHTML = "Mostrar Sección Principal";
      }
    });
  //======================================================
  //  Implementar clase para limitar ingreso solo a letras 
  //======================================================

  $(".letras").keypress(function (key) {
    //window.console.log(key.charCode)
    if ((key.charCode < 97 || key.charCode > 122)//letras mayusculas
        && (key.charCode < 65 || key.charCode > 90) //letras minusculas
        && (key.charCode != 45) //retroceso
        && (key.charCode != 241) //ñ
          && (key.charCode != 209) //Ñ
          && (key.charCode != 32) //espacio
          && (key.charCode != 225) //á
          && (key.charCode != 233) //é
          && (key.charCode != 237) //í
          && (key.charCode != 243) //ó
          && (key.charCode != 250) //ú
          && (key.charCode != 193) //Á
          && (key.charCode != 201) //É
          && (key.charCode != 205) //Í
          && (key.charCode != 211) //Ó
          && (key.charCode != 218) //Ú

        )
        return false;
  });

  //========================================================
  //  Implementar clase para limitar ingreso solo a números
  //========================================================
  
  $(".numeros").keydown(function(event) {
      if(event.shiftKey)	 {
              event.preventDefault();
      }
      if (event.keyCode > 57 ){ 
          if (event.keyCode < 96 || event.keyCode > 105) {
              event.preventDefault();
          }
      }
  });

})()

//======================================================
//  Validar correos electrónicos
//======================================================

function validarCorreo(correo){
  var email = $(correo).val();
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    $(correo).addClass('invalid');
  } else {
    $(correo).removeClass('invalid');
  }

  if($(correo).val() == ""){
      $(correo).removeClass('invalid');
  }
}