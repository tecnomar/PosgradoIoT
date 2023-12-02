<?php
    header('Content-Type: application/json');
    // Inicia una transacción
    sqlsrv_begin_transaction($conn);

    try {
    
        $UsuarioId = $_POST['usuarioId'];
        $Usuario = $_POST['usuario'];
        $Nombre = $_POST['nombre'];
        $Password = $_POST['password'];

        $arrResponse = array();
        
        $procedure_params = array(
            array(&$myparams['idUsuario'], SQLSRV_PARAM_IN),
            array(&$myparams['nombreUsuario'], SQLSRV_PARAM_IN),
            array(&$myparams['nombreLargo'], SQLSRV_PARAM_IN),
            array(&$myparams['clave'], SQLSRV_PARAM_IN),
        );
        // Guardamos el docente con los parametros requeridos
        $sql = "EXEC PosgradoIoT.dbo.uspUsuarioInsertUpdate @idUsuario = '$UsuarioId', @nombreUsuario = '$Usuario', @nombreLargo = '$Nombre', @clave = '$Password'";
        
        $stmt = sqlsrv_prepare($conn, $sql, $procedure_params);

        if (sqlsrv_execute($stmt)) {
            do {
                while ($row = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)) {
                        $rpta = $row['rtpa'];
                    }
            }
            while (sqlsrv_next_result($stmt));

            sqlsrv_free_stmt($stmt);

            if($rpta>1){
                $arrResponse = array('status' => true, 'msg' => 'Usuario se guardó correctamente');
            } elseif($rpta==1) {
                $arrResponse = array('status' => true, 'msg' => 'Usuario se modificó correctamente');
            } else {
                $arrResponse = array('status' => false, 'msg' => 'No grabó el Usuario');
            }

        } else {
            $arrResponse = array('status' => false, 'msg' => 'No se ejecutó el procedimiento');
        }

        // Confirma la transacción
        sqlsrv_commit($conn);
    } catch (Exception $e) {
        // Revierte la transacción en caso de error
        sqlsrv_rollback($conn);
        // Agrega un mensaje de error a la respuesta
        $arrResponse = array('status' => false, 'msg' => $e->getMessage());
    }
    sqlsrv_close($conn);
    echo json_encode($arrResponse);
