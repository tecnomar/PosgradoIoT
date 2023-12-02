<?php
require '../../conexion/Class.ConexionEsp8266.php';
$actuadores = array();

$sql = "exec PosgradoIoT.dbo.uspListaActuador";

$stmt = sqlsrv_prepare($conn, $sql);

if (sqlsrv_execute($stmt)) {
do {
        while ($row = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)) {
            $Estado = $row['Estado'];
            $ActuadorId = $row['ActuadorId'];
            $actuadores[] = array('codigo' => $ActuadorId, 'estado' => $Estado);
        }
    }
    while (sqlsrv_next_result($stmt));
} else {
    $actuadores = null;
}
sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);

header('Content-Type: application/json; charset=utf-8');

$json_actuadores = json_encode($actuadores);

echo $json_actuadores;
