<div class="content-wrapper" style="margin-top: 70px; min-height: 969px;">
<section class="h-100 mt-4">
	<div class="container h-100 mw-100">
		<div class="row justify-content-sm-center h-100">
			<div class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
				<div class="card shadow-lg">
					<div class="card-body p-5 row">
						<h1 class="fs-4 card-title fw-bold mb-4">Mantenimiento Actuadores</h1>
						<form id="form_actuadores" class="border p-4 rounded collapse" name="form_actuadores" method="POST" enctype="multipart/form-data" novalidate="" autocomplete="off">
							<div class="row">
								<div class="mb-3 col-lg-4 col-md-4 col-sm-12" hidden>
									<label class="mb-2 text-muted" for="ActuadorId">ActuadorId</label>
									<input id="ActuadorId" type="text" class="form-control" name="ActuadorId" value="" required>
								</div>
								<div class="mb-3 col-lg-4 col-md-4 col-sm-12">
									<label class="mb-2 text-muted" for="Descripcion">Nombre del actuador</label>
									<input id="Descripcion" type="text" class="form-control" name="Descripcion" value="" required autofocus>
								</div>
								<div class="mb-3 col-lg-4 col-md-4 col-sm-12">
									<label class="mb-2 text-muted" for="Estado">Estado</label>
									<input id="Estado" type="text" class="form-control" name="Estado" value="" required>
								</div>
								<div class="col-lg-12 col-md-12 col-sm-12 row mx-auto">
									<div class="mb-3 col-lg-4 col-md-4 col-sm-12">
										<div class="mb-4"></div>
										<a id="guardarModificarActuador" class="btn btn-primary ms-auto btn-login form-control mt-2">
											Guardar
										</a>
									</div>
									<div class="mb-3 col-lg-2 col-md-2 col-sm-12 ms-auto">
										<div class="mb-4"></div>
										<a id="btn_Limpiar" class="btn btn-primary ms-auto btn-login form-control mt-2">
											Limpiar Formulario
										</a>
									</div>
								</div>
							</div>
						</form>
						<div class="float-start mt-2">
							<spam id="textoCollapse">Mostrar Formulario</spam>
							<button class="btn btn_collapse iconos collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#form_actuadores" aria-expanded="false" aria-controls="collapse">
								<i class='bi bi-arrow-down-square'></i>
							</button>
						</div>
						<div class="p-2">
							<h3 class="fs-4 card-title fw-bold mb-5"></h3>
							<div id="tablaActuador" >
								<!-- Aqui se inserta la grilla de actuadores mediante ajax y php -->
							</div>
						</div>
						
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
</div>
