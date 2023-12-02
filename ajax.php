<?php
    if($_POST){
        require 'core/core.php' ;
        
        switch (isset($_GET['mode']) ? $_GET['mode'] : null) {
            
            case 'login':
                require 'core/ajax/login.php';
                break;
            case 'insertUpdateUsuario':
                require 'core/ajax/usuario/insertUpdateUsuario.php';
                break;
            case 'consultarUsuarios':
                require 'core/ajax/usuario/consultarUsuarios.php';
                break;
            case 'eliminarUsuario':
                require 'core/ajax/usuario/eliminarUsuario.php';
                break;
            case 'insertUpdateSensor':
                require 'core/ajax/sensor/insertUpdateSensor.php';
                break;
            case 'consultarSensores':
                require 'core/ajax/sensor/consultarSensores.php';
                break;
            case 'eliminarSensor':
                require 'core/ajax/sensor/eliminarSensor.php';
                break;
            case 'insertUpdateActuador':
                require 'core/ajax/actuador/insertUpdateActuador.php';
                break;
            case 'consultarActuadores':
                require 'core/ajax/actuador/consultarActuadores.php';
                break;
            case 'eliminarActuador':
                require 'core/ajax/actuador/eliminarActuador.php';
                break;
            case 'lectorSensor':
                require 'core/ajax/servicios/lectorSensor.php';
                break;
            case 'lectorSensorLineas':
                require 'core/ajax/servicios/lectorSensorLineas.php';
                break;
            case 'obtenerEstadoActuador':
                require 'core/ajax/servicios/obtenerEstadoActuador.php';
                break;
            case 'listaActuadores':
                require 'core/ajax/servicios/listaActuadores.php';
                break;
                case 'cambiarEstadoActuadores':
                    require 'core/ajax/servicios/cambiarEstadoActuadores.php';
                    break;
            default:
                header('location: index.php');
                break;
        }
    }else{
        header('location: index.php');
        exit;
    }
