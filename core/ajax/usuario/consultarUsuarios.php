<?php

$tabla="";

$sql = "Exec PosgradoIoT.dbo.uspListaUsuario";

$stmt = sqlsrv_prepare($conn, $sql);

if(sqlsrv_execute($stmt)){
    $cantidad = 0;
    $tabla.="<table id='listar_usuarios'  class='table-striped table-bordered border p-4 rounded' style='width:100%'>
                    <thead class='thead-dark' style='text-align:center; font-weight:inherit;'>
                    <tr>
                        <th scope='col' style='width: 15px; text-align:center;'>#</th>
                        <th scope='col'>Usuario</th>
                        <th scope='col'>Nombres</th>
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
                    <td>".$row['nombreUsuario']."</td>
                    <td>".$row['nombreLargo']."</td>
                    <td class='text-lg-center'><button aria-label='eliminar docente' onclick='javascript:
                    editarUsuario(".$row['idUsuario'].",\"".$row['nombreUsuario']."\",\"".$row['nombreLargo']."\")'
                    class='btn iconos'><i class='bi bi-pencil-square'></i></button></td>
                    <td class='text-lg-center'><button aria-label='eliminar docente' onclick='javascript:
                    preguntarEliminarUsuario(".$row['idUsuario'].")' class='btn iconos'><i class='bi bi-trash3'></i></button></td>
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

