<div class="content-wrapper" style="margin-top: 70px; min-height: 969px;">
<section class="h-100 mt-4">
	<div class="container h-100 mw-100">
		<div class="row justify-content-sm-center h-100">
			<div class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
				<div class="card shadow-lg">
					<div class="card-body p-5 row">
						<h1 class="fs-4 card-title fw-bold mb-4">Mantenimiento Usuarios</h1>
						<form id="form_usuarios" class="border p-4 rounded collapse" name="form_usuarios" method="POST" enctype="multipart/form-data" novalidate="" autocomplete="off">
							<div class="row">
								<div class="mb-3 col-lg-4 col-md-4 col-sm-12" hidden>
									<label class="mb-2 text-muted" for="usuarioId">usuarioId</label>
									<input id="usuarioId" type="text" class="form-control" name="usuarioId" value="" required>
								</div>
								<div class="mb-3 col-lg-4 col-md-4 col-sm-12">
									<label class="mb-2 text-muted" for="usuario">Usuario</label>
									<input id="usuario" type="text" class="form-control" name="usuario" value="" required autofocus>
								</div>
								<div class="mb-3 col-lg-4 col-md-4 col-sm-12">
									<label class="mb-2 text-muted" for="nombre">Nombre Completo</label>
									<input id="nombre" type="text" class="form-control" name="nombre" value="" required>
								</div>
								<div class="mb-3 col-lg-4 col-md-4 col-sm-12">
									<label class="mb-2 text-muted" for="password">Password</label>
									<input id="password" type="password" class="form-control" name="password" value="" required>
								</div>
								<div class="col-lg-12 col-md-12 col-sm-12 row mx-auto">
									<div class="mb-3 col-lg-4 col-md-4 col-sm-12">
										<div class="mb-4"></div>
										<a id="guardarModificarUsuario" class="btn btn-primary ms-auto btn-login form-control mt-2">
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
							<button class="btn btn_collapse iconos collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#form_usuarios" aria-expanded="false" aria-controls="collapse">
								<i class='bi bi-arrow-down-square'></i>
							</button>
						</div>
						<div class="p-2">
							<h3 class="fs-4 card-title fw-bold mb-5"></h3>
							<div id="tablaUsuario" >
								<!-- Aqui se inserta la grilla de usuarios mediante ajax y php -->
							</div>
						</div>
						
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
</div>
