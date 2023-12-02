<?php
    $UsuarioId = $_POST['UsuarioId'];
    $response = 0;
    
    $sql = "EXEC PosgradoIoT.dbo.uspUsuarioEliminar @UsuarioId = '$UsuarioId'";

    $stmt = sqlsrv_prepare($conn, $sql);

    if (sqlsrv_execute($stmt)) {
        do {
            while ($row = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)) {
                    $response = $row['rpta'];
                    
                    }
        }
            while (sqlsrv_next_result($stmt));
    } else {
        $response = null;
    }
    sqlsrv_free_stmt($stmt);
    sqlsrv_close($conn);
    echo json_encode($response);
