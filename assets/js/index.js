google.charts.load('current', {
    'packages': ['gauge','line']
});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        /*********************************************************************************************************/
        /********************************************** GRAFICO MEDIDOR ******************************************/
        /*********************************************************************************************************/
        
        /*********************************************************************************************************/
        /********************************************** TEMPERATURA DIRECCION ************************************/
        /*********************************************************************************************************/

        let data = google.visualization.arrayToDataTable([
            ['Label', 'Value'],
            ['Temperatura', 0],
        ]);

        let options = {
            width: 200,
            height: 200,
            redFrom: 40,
            redTo: 50,
            yellowFrom: 30,
            yellowTo: 40,
            minorTicks: 5,
            max:50
        };

        let chart = new google.visualization.Gauge(document.getElementById('chart_temperatura'));

        chart.draw(data, options);

        setInterval(function() {
            $.ajax({
                type: "post",
                url: "ajax.php?mode=lectorSensor",
                data: "SensorId="+"3",
                beforeSend: function () {
                    
                },
                success: function(response) {
                    data.setValue(0, 1,response);
                    chart.draw(data, options);
                },
                complete : function(xhr, status) {
                    
                }
            });  
        }, 3000);

        // Humedad Direccion ==========================================================================

        let data_humedad = google.visualization.arrayToDataTable([
            ['Label', 'Value'],
            ['Humedad', 0],
        ]);

        let options_humedad = {
            width: 200,
            height: 200,
            redFrom: 90,
            redTo: 100,
            yellowFrom: 70,
            yellowTo: 90,
            minorTicks: 5,
            max:100
        };

        let chart_humedad = new google.visualization.Gauge(document.getElementById('chart_humedad'));

        chart_humedad.draw(data_humedad, options_humedad);

        setInterval(function() {
            $.ajax({
                type: "post",
                url: "ajax.php?mode=lectorSensor",
                data: "SensorId="+"5",
                beforeSend: function () {
                    
                },
                success: function(response) {
                    data_humedad.setValue(0, 1,response);
                    chart_humedad.draw(data_humedad, options_humedad);
                },
                complete : function(xhr, status) {
                    
                }
            });
        }, 3000);


        // OFICINA ADMINISTRATIVA ==============================================================================
        // Temperatura

        let data_administrativa_temperatura = google.visualization.arrayToDataTable([
            ['Label', 'Value'],
            ['Temperatura', 0],
        ]);

        let options_administrativa_temperatura = {
            width: 200,
            height: 200,
            redFrom: 40,
            redTo: 50,
            yellowFrom: 30,
            yellowTo: 40,
            minorTicks: 5,
            max:50
        };

        let chart_administrativa_temperatura = new google.visualization.Gauge(document.getElementById('chart_temperatura_administrativo'));

        chart_administrativa_temperatura.draw(data_administrativa_temperatura, options_administrativa_temperatura);

        setInterval(function() {
            $.ajax({
                type: "post",
                url: "ajax.php?mode=lectorSensor",
                data: "SensorId="+"3",
                beforeSend: function () {
                    
                },
                success: function(response) {
                    data_administrativa_temperatura.setValue(0, 1,response);
                    chart_administrativa_temperatura.draw(data_administrativa_temperatura, options_administrativa_temperatura);
                },
                complete : function(xhr, status) {
                    
                }
            });
        }, 3000);

         // Humedad

        let data_administrativa_humedad = google.visualization.arrayToDataTable([
            ['Label', 'Value'],
            ['Humedad', 0],
        ]);

        let options_administrativa_humedad = {
            width: 200,
            height: 200,
            redFrom: 90,
            redTo: 100,
            yellowFrom: 70,
            yellowTo: 90,
            minorTicks: 5,
            max:100
        };

        let chart_administrativa_humedad = new google.visualization.Gauge(document.getElementById('chart_humedad_administrativo'));

        chart_administrativa_humedad.draw(data_administrativa_humedad, options_administrativa_humedad);

        setInterval(function() {
            $.ajax({
                type: "post",
                url: "ajax.php?mode=lectorSensor",
                data: "SensorId="+"5",
                beforeSend: function () {
                    
                },
                success: function(response) {
                    data_administrativa_humedad.setValue(0, 1,response);
                    chart_administrativa_humedad.draw(data_administrativa_humedad, options_administrativa_humedad);
                },
                complete : function(xhr, status) {
                    
                }
            });
        }, 3000);

        /***********************************************************************************************************/
        /********************************************** GRAFICO DE LINEAS ******************************************/
        /***********************************************************************************************************/


        let data_lineas = new google.visualization.DataTable();
            data_lineas.addColumn('string', 'Día');
            data_lineas.addColumn('number', 'Temperatura Dirección');
            data_lineas.addColumn('number', 'Humedad Direccion');

            // Configurar las opciones del gráfico
            let options_lineas = {
                chart: {
                    title: 'Control de Temperatura y Humedad en Días',
                    subtitle: 'Oficina de Direccion y Administrativa'
                },
                height: 400,
                width: 800,
                vAxis: {
                    title: 'Medidas',
                    textStyle: {
                        fontSize: 12
                    },
                    minValue:0,
                    maxValue:100
                },
                hAxis: {
                    title: 'Fecha : ',
                    textStyle: {
                        fontSize: 12
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'out'
                }
            };

            // Dibujar el gráfico inicial
            let chart_lineas = new google.charts.Line(document.getElementById('linechart_material'));

            // Simular un flujo de datos en tiempo real cada 3 segundos
            setInterval(function() {
                // Realizar la solicitud AJAX para obtener datos del servidor
                $.ajax({
                    type: "post",
                    url: "ajax.php?mode=lectorSensorLineas",
                    data: "SensorId=" + "",
                    beforeSend: function () {},
                    success: function(data) {
                        // Parsear la respuesta JSON
                        let dataArray = JSON.parse(data);
                        //console.log(dataArray);

                        // Actualizar el gráfico con los nuevos datos
                        updateChartWithData(dataArray);
                    },
                    complete: function(xhr, status) {}
                });
            }, 3000); // Actualizar cada 3 segundos

            // Función para actualizar el gráfico con nuevos datos
            function updateChartWithData(newData) {

                let fechaActual = new Date();

                // Formatear la fecha en el formato deseado (hora:minuto:segundo)
                let formatoFecha = pad(fechaActual.getHours()) + ":" + pad(fechaActual.getMinutes()) + ":" + pad(fechaActual.getSeconds());

                // Convertir las cadenas a números
                let temperatura = parseFloat(newData[0].Lectura);
                let humedad = parseFloat(newData[1].Lectura);


                // Agregar la nueva fila al DataTable de Google Charts
                data_lineas.addRow([formatoFecha, temperatura, humedad]);


                // Crear un objeto de fecha
                const fecha = new Date(newData[0].Fecha.date);

                // Obtener las partes de la fecha
                const año = fecha.getFullYear();
                const mes = ('0' + (fecha.getMonth() + 1)).slice(-2); // Sumar 1 porque los meses van de 0 a 11
                const dia = ('0' + fecha.getDate()).slice(-2);
                const hora = ('0' + fecha.getHours()).slice(-2);
                const minutos = ('0' + fecha.getMinutes()).slice(-2);
                const segundos = ('0' + fecha.getSeconds()).slice(-2);

                // Crear la nueva cadena de fecha y hora con segundos
                const nuevaFecha = `${dia}/${mes}/${año} ${hora}:${minutos}:${segundos}`;


                let h2Element = document.getElementById('Fecha_comparativa');
                let mensaje_fecha = document.getElementById('mensaje_fecha');
                fechaFormateada = 'Actual => ' + fechaActual.toLocaleDateString()+ " " + formatoFecha + " - BD => "+ nuevaFecha;
                h2Element.textContent = fechaFormateada;

                // Calcular la diferencia en milisegundos
                var diferenciaEnMilisegundos = Math.abs(fechaActual - fecha);
                
                // Convertir la diferencia a segundos
                var diferenciaEnSegundos = Math.floor(diferenciaEnMilisegundos / 1000); // Usar Math.floor para redondear hacia abajo
                

                //console.log(diferenciaEnSegundos);

                // Verificar si la diferencia es menor o igual a 30 segundos
                if (diferenciaEnSegundos >= 15) {
                    iniciarParpadeo(mensaje_fecha);
                    // Si es así, aplicar estilo para que se muestre en rojo
                    h2Element.style.color = 'red';
                    mensaje_fecha.textContent = 'Revisar Microcontrolador, Red y Base de Datos';
                } else {
                   // detenerParpadeo();
                    h2Element.style.color = 'black';
                    mensaje_fecha.textContent = '';
                }

                // Actualizar el título del eje x con la fecha actual
                //options_lineas.hAxis.title = 'Actual => ' + fechaActual.toLocaleDateString()+ " " + formatoFecha + " - BD => "+ nuevaFecha;
                //console.log("Temperatura Direccion : ", temperatura);

                //console.log("Fecha : ", nuevaFecha);

                // Dibujar el gráfico actualizado
                chart_lineas.draw(data_lineas, google.charts.Line.convertOptions(options_lineas));
            }
            function pad(num) {
                return num < 10 ? "0" + num : num;
            }
            
    }

    // Definir una variable para el intervalo
    var parpadeoIntervalo;

    // Función para iniciar el parpadeo
    function iniciarParpadeo(h2Element) {
        // parpadeoIntervalo = setInterval(function () {
            // Cambiar entre rojo y blanco
            if (h2Element.style.color === 'red') {
                h2Element.style.color = 'white';
                h2Element.style.backgroundColor = 'red';
            } else {
                h2Element.style.color = 'red';
                h2Element.style.backgroundColor = 'white';
            }
        // }, 3000); // Cambia de color cada 500 milisegundos (0.5 segundos)
    }

    // Función para detener el parpadeo
    // function detenerParpadeo() {
    //     clearInterval(parpadeoIntervalo);
    // }

    $(document).ready(function () {

       
            let foco1_direccion = document.getElementById('foco1_direccion').closest(".toggle");

            foco1_direccion.addEventListener("click", function (event) {
                cambiarEstadoActuador(2);
            });
            
            let aire_acondicionado_direccion = document.getElementById('aire_acondicionado_direccion').closest(".toggle");

            aire_acondicionado_direccion.addEventListener("click", function (event) {
                cambiarEstadoActuador(8);
            });

            let deshumedecedor_direccion = document.getElementById('deshumedecedor_direccion').closest(".toggle");

            deshumedecedor_direccion.addEventListener("click", function (event) {
                cambiarEstadoActuador(10);
            });
        
            let aire_acondicionado_administracion = document.getElementById('aire_acondicionado_administracion').closest(".toggle");

            aire_acondicionado_administracion.addEventListener("click", function (event) {
                cambiarEstadoActuador(9);
            });

            let deshumedecedor_administracion = document.getElementById('deshumedecedor_administracion').closest(".toggle");

            deshumedecedor_administracion.addEventListener("click", function (event) {
                cambiarEstadoActuador(11);
            });

            let foco1_pasadizo = document.getElementById('foco1_pasadizo').closest(".toggle");

            foco1_pasadizo.addEventListener("click", function (event) {
                cambiarEstadoActuador(3);
            });

            let foco2_pasadizo = document.getElementById('foco2_pasadizo').closest(".toggle");

            foco2_pasadizo.addEventListener("click", function (event) {
                cambiarEstadoActuador(4);
            });

            let foco3_pasadizo = document.getElementById('foco3_pasadizo').closest(".toggle");

            foco3_pasadizo.addEventListener("click", function (event) {
                cambiarEstadoActuador(5);
            });
            
            let foco1_administracion = document.getElementById('foco1_administracion').closest(".toggle");

            foco1_administracion.addEventListener("click", function (event) {
                cambiarEstadoActuador(6);
            });

            let foco2_administracion = document.getElementById('foco2_administracion').closest(".toggle");

            foco2_administracion.addEventListener("click", function (event) {
                cambiarEstadoActuador(7);
            });

            let chapa_administracion = document.getElementById('chapa_administracion').closest(".toggle");

            chapa_administracion.addEventListener("click", function (event) {
                cambiarEstadoActuador(1);
            });

            let puertaCheckbox = document.getElementById('puerta').closest(".toggle");

            puertaCheckbox.addEventListener("click", function (event) {
                cambiarEstadoActuador(14);
            });

    });
    
    setInterval(function() {
        actualizaActuadores();
    }, 3000);

    function actualizaActuadores(){
        $.ajax({
            type: "post",
            url: "ajax.php?mode=listaActuadores",
            data: "Id="+"",
            beforeSend: function () {},
            success: function(data) {
                let dataArray = JSON.parse(data);
                        //console.log(data);
                        
                        dataArray.forEach(function(item) {
                            if (item.ActuadorId === 1) {
                                cambiarChecked("chapa_administracion", item.Estado);
                                
                            } else if(item.ActuadorId === 2){
                                cambiarChecked("foco1_direccion", item.Estado);
                                
                            } else if(item.ActuadorId === 3){
                                cambiarChecked("foco1_pasadizo", item.Estado);
                                
                            } else if(item.ActuadorId === 4){
                                cambiarChecked("foco2_pasadizo", item.Estado);
                                
                            } else if(item.ActuadorId === 5){
                                cambiarChecked("foco3_pasadizo", item.Estado);
                                
                            } else if(item.ActuadorId === 6){
                                cambiarChecked("foco1_administracion", item.Estado);
                                
                            } else if(item.ActuadorId === 7){
                                cambiarChecked("foco2_administracion", item.Estado);
                                
                            } else if(item.ActuadorId === 8){
                                cambiarChecked("aire_acondicionado_direccion", item.Estado);
                                
                            } else if(item.ActuadorId === 9){
                                cambiarChecked("aire_acondicionado_administracion", item.Estado);
                                
                            } else if(item.ActuadorId === 10){
                                cambiarChecked("deshumedecedor_direccion", item.Estado);
                                
                            } else if(item.ActuadorId === 11){
                                cambiarChecked("deshumedecedor_administracion", item.Estado);
                                
                            } else if(item.ActuadorId === 14){
                                cambiarChecked("puerta", item.Estado);
                            }
                        
                        });
            },
            complete: function(xhr, status) {
            }
        });
    }

    function cambiarChecked(actuador, estado){
        //console.log("actuador => " + actuador + " - Estado => "+estado);
        let checkbox = document.getElementById(actuador);
        // Actualiza el estado "checked" del checkbox
        checkbox.checked = (estado === 1);

        
        let toggleButton = document.getElementById(actuador).closest(".toggle");
        if (checkbox.checked) {
            toggleButton.classList.remove("off");
            toggleButton.classList.add("on");
            toggleButton.classList.remove("btn-danger");
            toggleButton.classList.add("btn-primary");
        } else {
            toggleButton.classList.remove("on");
            toggleButton.classList.add("off");
            toggleButton.classList.remove("btn-primary");
            toggleButton.classList.add("btn-danger");
        }

    }
    function cambiarEstadoActuador(ActuadorId){
        //console.log("ActuadorId = ", ActuadorId);
        $.ajax({
            type: "post",
            url: "ajax.php?mode=cambiarEstadoActuadores",
            data: "ActuadorId=" + ActuadorId,
            beforeSend: function () {},
            success: function(response) {
                //console.log(response);
            },
            complete: function(xhr, status) {
            }
        });
    }
    function obtenerEstado(ActuadorId){
        $.ajax({
            type: "post",
            url: "ajax.php?mode=obtenerEstadoActuador",
            data: "ActuadorId=" + ActuadorId,
            beforeSend: function () {},
            success: function(response) {
               // console.log("Estado de Actuador = ", response);
            },
            complete: function(xhr, status) {
            }
        });
    }