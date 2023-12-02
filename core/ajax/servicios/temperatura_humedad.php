<?php

require '../../conexion/Class.ConexionEsp8266.php';

$datos = $_REQUEST['datos'];
$json_data = json_decode($datos, true);

$response = array();

if ($json_data === null || json_last_error() !== JSON_ERROR_NONE) {
    $response = null;
    // Manejar error de JSON no válido
    die('Error en el formato JSON');
}

// Extraer variables del array asociativo
$SensorIdTemperatura = filter_var($json_data['SensorIdTemperatura'], FILTER_SANITIZE_STRING);
$SensorIdHumedad = filter_var($json_data['SensorIdHumedad'], FILTER_SANITIZE_STRING);
$Temperatura = filter_var($json_data['Temperatura'], FILTER_SANITIZE_STRING);
$Humedad = filter_var($json_data['Humedad'], FILTER_SANITIZE_STRING);

$OficinaNom_Temperatura = "";
$AmbienteNom_Temperatura = "";
$ActuadorNom_Temperatura = "";

$OficinaNom_Humedad = "";
$AmbienteNom_Humedad = "";
$ActuadorNom_Humedad = "";
$alertaTemperatura = 0;
$alertaHumedad = 0;

/********************* INSERTAR TEMPERATURA ************************/

try {
    // Iniciar transacción
    sqlsrv_begin_transaction($conn);

    $procedure_params_temperatura = array(
        array(&$LectorSensorId, SQLSRV_PARAM_IN),
        array(&$SensorIdTemperatura, SQLSRV_PARAM_IN),
        array(&$Temperatura, SQLSRV_PARAM_IN),
    );

    $sql_temperatura = "EXEC PosgradoIoT.dbo.uspLectorSensorinsert @LectorSensorId = ?, @SensorId = ?, @Lectura = ?";

    $stmt_temperatura = sqlsrv_prepare($conn, $sql_temperatura, $procedure_params_temperatura);

    if (sqlsrv_execute($stmt_temperatura)) {
        do {
            while ($row = sqlsrv_fetch_array($stmt_temperatura, SQLSRV_FETCH_ASSOC)) {
                $OficinaNom_Temperatura = $row['OficinaNom'];
                $AmbienteNom_Temperatura = $row['AmbienteNom'];
                $ActuadorNom_Temperatura = $row['ActuadorNom'];
                $alertaTemperatura = $row['alerta'];

            }
        } while (sqlsrv_next_result($stmt_temperatura));
        if($alertaTemperatura == 1){
            //notificamos_alerta($OficinaNom_Temperatura, $AmbienteNom_Temperatura, $ActuadorNom_Temperatura, $Temperatura);
        }
    } else {
        throw new Exception('Error al ejecutar la consulta de temperatura');
    }

    sqlsrv_free_stmt($stmt_temperatura);

    /********************* INSERTAR HUMEDAD ************************/

    $procedure_params_humedad = array(
        array(&$LectorSensorId, SQLSRV_PARAM_IN),
        array(&$SensorIdHumedad, SQLSRV_PARAM_IN),
        array(&$Humedad, SQLSRV_PARAM_IN),
    );

    $sql_humedad = "EXEC PosgradoIoT.dbo.uspLectorSensorinsert @LectorSensorId = ?, @SensorId = ?, @Lectura = ?";

    $stmt_humedad = sqlsrv_prepare($conn, $sql_humedad, $procedure_params_humedad);

    if (sqlsrv_execute($stmt_humedad)) {
        do {
            while ($row = sqlsrv_fetch_array($stmt_humedad, SQLSRV_FETCH_ASSOC)) {
                $OficinaNom_Humedad = $row['OficinaNom'];
                $AmbienteNom_Humedad = $row['AmbienteNom'];
                $ActuadorNom_Humedad = $row['ActuadorNom'];
                $alertaHumedad = $row['alerta'];
            }
        } while (sqlsrv_next_result($stmt_humedad));
        if($alertaHumedad == 1){
            //notificamos_alerta($OficinaNom_Humedad, $AmbienteNom_Humedad, $ActuadorNom_Humedad, $Humedad);
        }
    } else {
        throw new Exception('Error al ejecutar la consulta de humedad');
        
    }

    sqlsrv_free_stmt($stmt_humedad);

    /**
     * NOTIFICACIONES
     */

    notificar($SensorIdTemperatura, $conn, $Temperatura);// Temperatura Direccion
    notificar($SensorIdHumedad, $conn, $Humedad);// Humedad Direccion

    // Confirmar la transacción
    sqlsrv_commit($conn);
} catch (Exception $e) {
    // En caso de error, realizar rollback y manejar la excepción
    sqlsrv_rollback($conn);
    $response = null;
    echo 'Error: ' . $e->getMessage();
}

sqlsrv_close($conn);
echo "Alerta Temperatura es : ".$alertaTemperatura." Y Alerta Humedad es :".$alertaHumedad;

function notificar($SensorId, $conn, $Lectura){
    $sql_notificacion = "PosgradoIoT.dbo.uspListaSensor  @SensorId = '$SensorId'";

            $stmt_notificacion = sqlsrv_prepare($conn, $sql_notificacion);
    
            if (sqlsrv_execute($stmt_notificacion)) {
                do {
                    while ($row = sqlsrv_fetch_array($stmt_notificacion,SQLSRV_FETCH_ASSOC)) {
                            $valorMin = $row['valorMin'];
                            $valorMax = $row['valorMax'];
                            }
                }
                    while (sqlsrv_next_result($stmt_notificacion));
                if($Lectura < $valorMin){
                    cambiarEstadoActuador($SensorId, $conn, 0);
                } elseif($Lectura > $valorMax){
                    cambiarEstadoActuador($SensorId, $conn, 1);
                }

            } else {
                $response = null;
            }
            sqlsrv_free_stmt($stmt_notificacion);
}

function cambiarEstadoActuador($SensorId, $conn, $NuevoEstado){

    $response = "";

    $sql_cambiar_estado = "PosgradoIoT.dbo.uspCambiarEstadoActuador @SensorId = '$SensorId',  @NuevoEstado = '$NuevoEstado'";

    $stmt_cambiar_estado = sqlsrv_prepare($conn, $sql_cambiar_estado);

    if (sqlsrv_execute($stmt_cambiar_estado)) {
        do {
            while ($row = sqlsrv_fetch_array($stmt_cambiar_estado,SQLSRV_FETCH_ASSOC)) {
                    $response = $row;
                    
                    }
        }
            while (sqlsrv_next_result($stmt_cambiar_estado));
            // require_once 'enviar_whatsapp.php';

            // enviar("Se cambio el estado de SensorId : ".$SensorId);
    } else {
        $response = null;
    }
    sqlsrv_free_stmt($stmt_cambiar_estado);

}

function notificamos_alerta($OficinaNom, $AmbienteNom, $ActuadorNom, $Lectura){
    require_once 'enviar_whatsapp.php';

    enviar("AlertaEmergencia: "."En la Oficina : ".$OficinaNom." ".$AmbienteNom." ".$ActuadorNom." -> La Lectura es : ".$Lectura);
}
