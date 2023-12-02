<?php
    header('Content-Type: application/json');
    // Inicia una transacción
    sqlsrv_begin_transaction($conn);

    try {
    
        $SensorId = $_POST['SensorId'];
        $Descripcion = $_POST['Descripcion'];
        $Minimo = $_POST['Minimo'];
        $Maximo = $_POST['Maximo'];
        $Alerta = $_POST['Alerta'];

        $arrResponse = array();
        
        $procedure_params = array(
            array(&$myparams['SensorId'], SQLSRV_PARAM_IN),
            array(&$myparams['Descripcion'], SQLSRV_PARAM_IN),
            array(&$myparams['ValorMin'], SQLSRV_PARAM_IN),
            array(&$myparams['ValorMax'], SQLSRV_PARAM_IN),
            array(&$myparams['ValorAlerta'], SQLSRV_PARAM_IN),
        );
        // Guardamos el docente con los parametros requeridos
        $sql = "EXEC PosgradoIoT.dbo.uspSensorInsertUpdate @SensorId = '$SensorId', @Descripcion = '$Descripcion', @ValorMin = '$Minimo', @ValorMax = '$Maximo', @ValorAlerta = '$Alerta'";
        
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
                $arrResponse = array('status' => true, 'msg' => 'Sensor se guardó correctamente');
            } elseif($rpta==1) {
                $arrResponse = array('status' => true, 'msg' => 'Sensor se modificó correctamente');
            } else {
                $arrResponse = array('status' => false, 'msg' => 'No grabó el Sensor');
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
