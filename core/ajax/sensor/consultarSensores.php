<?php

$tabla="";

$sql = "Exec PosgradoIoT.dbo.uspListaSensor";

$stmt = sqlsrv_prepare($conn, $sql);

if(sqlsrv_execute($stmt)){
    $cantidad = 0;
    $tabla.="<table id='listar_sensores'  class='table-striped table-bordered border p-4 rounded' style='width:100%'>
                    <thead class='thead-dark' style='text-align:center; font-weight:inherit;'>
                    <tr>
                        <th scope='col' style='width: 15px; text-align:center;'>#</th>
                        <th scope='col'>Descripción</th>
                        <th scope='col'>Valor Mínimo</th>
                        <th scope='col'>Valor Máximo</th>
                        <th scope='col'>Valor Alerta</th>
                        <th scope='col'>Modificar</th>
                        <th scope='col'>Eliminar</th>
                    </tr>
                    </thead>
                    <tbody>";
    do {
        while ($row = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)) {
            $cantidad = $cantidad + 1;
            $tabla.= "<tr>
                    <td class='text-lg-center'>".$cantidad."</td>
                    <td>".$row['Descripcion']."</td>
                    <td>".$row['valorMin']."</td>
                    <td>".$row['valorMax']."</td>
                    <td>".$row['valorAlerta']."</td>
                    <td class='text-lg-center'><button aria-label='eliminar docente' onclick='javascript:
                    editarSensor(".$row['SensorId'].",\"".$row['Descripcion']."\",\"".$row['valorMin']."\",\"".$row['valorMax']."\",\"".$row['valorAlerta']."\")'
                    class='btn iconos'><i class='bi bi-pencil-square'></i></button></td>
                    <td class='text-lg-center'><button aria-label='eliminar docente' onclick='javascript:
                    preguntarEliminarSensor(".$row['SensorId'].")' class='btn iconos'><i class='bi bi-trash3'></i></button></td>
                </tr>";
        }
    }
    while (sqlsrv_next_result($stmt));
    
    $tabla.="</tbody>
            </table>";
    
} else {
    echo $tabla = null;
}
sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);
echo $tabla;

