<?php
//'header("Cache-Control: no-store, no-cache, must-revalidate");

session_start();//INICIANDO SESSION
/*
Constantes de conexión
*/
define('DB_HOST','192.168.0.7');// ALOJAMIENTO DE LA APP
define('DB_USER','sa');// USUARIO DE LA BASE DE DATOS
define('DB_PASS','123');// PASSWORD DE LA BASE DE DATOS
define('DB_NAME','PosgradoIoT');// NOMBRE DE LA BASE DE DATOS

/*
Constantes de la App
*/

$ale = rand(0,100000);// NUMERO ALEATORIO
define('NUM_ALEATORIO',$ale);// DEFINIR NUMERO ALEATORIO PARA INCLUIRLO EN LAS VERSIONES DE LAS LLAMADAS A ARCHIVOS JS Y CSSS PARA EVITAR EL CACHE

require 'core/conexion/class.Conexion.php';
