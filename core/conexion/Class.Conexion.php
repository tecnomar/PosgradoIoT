<?php
$serverName = DB_HOST;
$connectionOptions = array("Database"=>DB_NAME, "Uid"=>DB_USER, "PWD"=>DB_PASS,"MultipleActiveResultSets"=>true, "CharacterSet"=> "UTF-8","TrustServerCertificate"=>true);
$conn = sqlsrv_connect($serverName, $connectionOptions);
if(!$conn){
    die(print_r(sqlsrv_errors(), true));
}
