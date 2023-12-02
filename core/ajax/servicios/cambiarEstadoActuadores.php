<?php

$ActuadorId = $_POST['ActuadorId'];
$response = "";

$sql = "PosgradoIoT.dbo.uspEstadoActuador @ActuadorId = '$ActuadorId'";

$stmt = sqlsrv_prepare($conn, $sql);

if (sqlsrv_execute($stmt)) {
    do {
        while ($row = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)) {
                $response = $row;
                
                }
    }
        while (sqlsrv_next_result($stmt));
} else {
    $response = null;
}
sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);
echo $response;




