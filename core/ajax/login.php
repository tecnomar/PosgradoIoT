<?php
    header('Content-Type: application/json');

    $Usuario = $_POST['Usuario'];
    $Password = $_POST['Password'];
    
    $response = array();
    $arrResponse = array();
    
    $procedure_params = array(
    array(&$myparams['nombreUsuario'], SQLSRV_PARAM_IN),
    array(&$myparams['clave'], SQLSRV_PARAM_IN),
    );

    $sql = "EXEC PosgradoIoT.dbo.uspLogueo @nombreUsuario = '$Usuario', @clave = '$Password'";
    
    $stmt = sqlsrv_prepare($conn, $sql, $procedure_params);

    if (sqlsrv_execute($stmt)) {
        do {
            while ($row = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)) {
                    $response = $row;
                    $Rpta = $response['rpta'];
                }
        }
            while (sqlsrv_next_result($stmt));
        if ($response && $Rpta==1) {
            $_SESSION['usuario'] = $Usuario;
            $arrResponse = array('status' => true, 'msg' => "Bienvenido");
        } else {
            $arrResponse = array('status' => false, 'msg' => "Usuario o Password Incorrecto");
        }
        
    } else {
        $arrResponse = array('status' => false, 'msg' => 'No se ejecuto Posgrado.uspUsuarioLogueo contactar con soporte');
    }
    sqlsrv_free_stmt($stmt);
    sqlsrv_close($conn);
    echo json_encode($arrResponse);

