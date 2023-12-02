
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
<!-- Content Header (Page header) -->
    <div class="p-3">
        <div class="container-fluid d-flex justify-content-between align-items-center">
            <h3>Panel de Control Posgrado IOT</h3>
            <h5 id="Fecha_comparativa" class="text-right"></h5>
            <p class="p-2 border rounded-2" id="mensaje_fecha"></p>
        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                    <div class="col-sm-3 m-1 p-4 border  border-primary border-4 rounded rounded-4">
                        <div><h3 class="m-0">Dirección</h3></div>
                        <div id="chart_temperatura"></div>
                        <div id="chart_humedad"></div>
                    </div>
                    <div class="col-sm-3 m-1 p-4 border  border-primary border-4 rounded rounded-4">
                        <div><h3 class="m-0">Administración</h3></div>
                        <div id="chart_temperatura_administrativo"></div>
                        <div id="chart_humedad_administrativo"></div>
                    </div>
                    <div class="col-sm m-1 p-4 border  border-primary border-4 rounded rounded-4">
                        <div><h3 class="mb-2">Monitoreo de Temperatura y Humedad</h3></div>
                        <div id="linechart_material"></div>
                    </div>
            </div>
            <div class="row">
                    <div class="col-sm-3 m-1 p-4 border  border-primary border-4 rounded rounded-4">
                        <div><h3 class="m-0">Dirección</h3></div>
                        <div class="form-check p-2 border border-1 border-black rounded-2 m-2">
                            <input id="foco1_direccion" type="checkbox" value="" data-toggle="toggle" data-onstyle="primary" data-offstyle="danger">
                            <label for="foco1_direccion" class="form-check-label ml-3">Foco Nro 1</label>
                        </div>
                        <div class="p-2 border border-1 border-black rounded-2 m-2">
                            <input id="aire_acondicionado_direccion" type="checkbox" data-toggle="toggle" data-onstyle="primary" data-offstyle="danger">
                            <label for="aire_acondicionado_direccion" class="form-check-label ml-3">Aire Acondicionado</label>
                        </div>
                        <div class="p-2 border border-1 border-black rounded-2 m-2">
                            <input id="deshumedecedor_direccion" type="checkbox" data-toggle="toggle" data-onstyle="primary" data-offstyle="danger">
                            <label for="deshumedecedor_direccion" class="form-check-label ml-3">Deshumedecedor</label>
                        </div>
                        <div class="p-2 border border-1 border-black rounded-2 m-2">
                            <input id="puerta" type="checkbox" data-toggle="toggle" data-onstyle="primary" data-offstyle="danger">
                            <label for="puerta" class="form-check-label puerta-label ml-3">Puerta</label>
                        </div>
                    </div>
                    <div class="col-sm-3 m-1 p-4 border  border-primary border-4 rounded rounded-4">
                        <div><h3 class="m-0">Pasadizo</h3></div>
                        <div class="p-2 border border-1 border-black rounded-2 m-2">
                            <input id="foco1_pasadizo" type="checkbox" data-toggle="toggle" data-onstyle="primary" data-offstyle="danger">
                            <label for="foco1_pasadizo" class="form-check-label ml-3">Foco Nro 1</label>
                        </div>
                        <div class="p-2 border border-1 border-black rounded-2 m-2">
                            <input id="foco2_pasadizo" type="checkbox" data-toggle="toggle" data-onstyle="primary" data-offstyle="danger">
                            <label for="foco2_pasadizo" class="form-check-label ml-3">Foco Nro 2</label>
                        </div>
                        <div class="p-2 border border-1 border-black rounded-2 m-2">
                            <input id="foco3_pasadizo" type="checkbox" data-toggle="toggle" data-onstyle="primary" data-offstyle="danger">
                            <label for="foco3_pasadizo" class="form-check-label ml-3">Foco Nro 3</label>
                        </div>
                    </div>
                    <div class="col-sm m-1 p-4 border  border-primary border-4 rounded rounded-4">
                        <div><h3 class="mb-2">Administración</h3></div>
                        <div class="p-2 border border-1 border-black rounded-2 m-2">
                            <input id="foco1_administracion" type="checkbox" data-toggle="toggle" data-onstyle="primary" data-offstyle="danger">
                            <label for="foco1_administracion" class="form-check-label ml-3">Foco Nro 1</label>
                        </div>
                        <div class="p-2 border border-1 border-black rounded-2 m-2">
                            <input id="foco2_administracion" type="checkbox" data-toggle="toggle" data-onstyle="primary" data-offstyle="danger">
                            <label for="foco2_administracion" class="form-check-label ml-3">Foco Nro 2</label>
                        </div>
                        <div class="p-2 border border-1 border-black rounded-2 m-2">
                            <input id="chapa_administracion" type="checkbox" data-toggle="toggle" data-onstyle="primary" data-offstyle="danger">
                            <label for="chapa_administracion" class="form-check-label ml-3">Chapa Eléctrica</label>
                        </div>
                        <div class="p-2 border border-1 border-black rounded-2 m-2">
                            <input id="aire_acondicionado_administracion" type="checkbox" data-toggle="toggle" data-onstyle="primary" data-offstyle="danger">
                            <label for="aire_acondicionado_administracion" class="form-check-label ml-3">Aire Acondicionado</label>
                        </div>
                        <div class="p-2 border border-1 border-black rounded-2 m-2">
                            <input id="deshumedecedor_administracion" type="checkbox" data-toggle="toggle" data-onstyle="primary" data-offstyle="danger">
                            <label for="deshumedecedor_administracion" class="form-check-label ml-3">Deshumedecedor</label>
                        </div>
                    </div>
            </div>
            <div class="row">
                <video id="localVideo" autoplay playsinline style="width: 50%;"></video>
                <video id="remoteVideo" autoplay playsinline style="width: 50%;"></video>
            </div>
        </div>
    </div>
</div>

<!-- Control Sidebar -->
<aside class="control-sidebar control-sidebar-dark" aria-label="controlsidebar">
<!-- Control sidebar content goes here -->
</aside>
