<!DOCTYPE html>
<html lang="es">
<head>
<title>Postgrado IOT</title>
</head>
<?php

/*
AQUI COMIENZA INCLUYENDO LAS PAGINAS UTILIZANDO CONTROLADORES
*/

// REQUERIMOS TODAS LAS CONSTANTES Y ARCHIVOS DEL CORE
require 'core/core.php';

// PREGUNTAR SI EXISTE LA VARIABLE VIEW
if(isset($_GET['view'])) {
    
    // PREGUNTAR SI EXISTE EL ARCHIVO xxxController.PHP EL xxx LO PASAMOS POR GET CON LA VARIABLE view?=xxx
    if(file_exists('core/controllers/' . strtolower($_GET['view']) . 'Controller.php')) {
        
        // SI EXISTE EL ARCHIVO LO INCLUIMOS
        include 'core/controllers/' . strtolower($_GET['view']) . 'Controller.php';
    } else {
        
        // SI NO EXISTE INCLUIMOS errorController.php
        include 'core/controllers/errorController.php';
    }
} else {
    // SI NO EXISTE UNA VARIABLE VIEW INCLUIMOS indexController.php
    if (session_status() == PHP_SESSION_ACTIVE && isset($_SESSION['usuario'])){
        include 'core/controllers/indexController.php';
    } else {
        include 'core/controllers/loginController.php';
    }
}

?>
</html>
