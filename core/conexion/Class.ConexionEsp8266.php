<?php

define('DB_HOST','192.168.0.7');// ALOJAMIENTO DE LA APP
define('DB_USER','sa');// USUARIO DE LA BASE DE DATOS
define('DB_PASS','123');// PASSWORD DE LA BASE DE DATOS
define('DB_NAME','PosgradoIoT');// NOMBRE DE LA BASE DE DATOS

$serverName = DB_HOST;
$connectionOptions = array("Database"=>DB_NAME, "Uid"=>DB_USER, "PWD"=>DB_PASS,"MultipleActiveResultSets"=>true, "CharacterSet"=> "UTF-8","TrustServerCertificate"=>true);
$conn = sqlsrv_connect($serverName, $connectionOptions);
if(!$conn){
    die(print_r(sqlsrv_errors(), true));
}
