<body class="hold-transition login-page">
<div class="login-box">
	<!-- /.login-logo -->
	<div class="card card-outline">
	<div class="card-header text-center">
		<p class="h1"><b>Posgrado</b>IOT</p>
	</div>
	<div class="card-body">
		<p class="login-box-msg"></p>

		<form id="login" method="post">
		<div class="input-group mb-3">
			<input id="usuario" name="usuario" type="text" class="form-control" placeholder="Usuario">
			<div class="input-group-append">
			<div class="input-group-text">
				<span class="fas fa-user"></span>
			</div>
			</div>
		</div>
		<div class="input-group mb-3">
			<input id="password" name="password" type="password" class="form-control" placeholder="Password">
			<div class="input-group-append">
			<div class="input-group-text">
				<span class="fas fa-lock"></span>
			</div>
			</div>
		</div>
		<div class="row">
			<div class="col-8">
			<div class="icheck-primary">
				<input type="checkbox" id="remember">
				<label for="remember">
				Recuérdame
				</label>
			</div>
			</div>
			<!-- /.col -->
			<div class="col-4">
			<button id="ingresar" type="submit" class="btn btn-primary btn-block">Ingresar</button>
			</div>
			<!-- /.col -->
		</div>
		</form>
	</div>
	<!-- /.card-body -->
	</div>
	<!-- /.card -->
</div>
</body>

<style>
	body {
            margin: 0;
            padding: 0;
            background-image: url('dist/img/fondo5_posgrado_iot.jpg'); /* Reemplaza 'ruta_de_la_imagen.jpg' con la ruta de tu imagen de fondo */
            background-size: cover;
            background-repeat: no-repeat;
            background-attachment: fixed;
            background-position: center;
			position: relative;
        }
		body::before {
			content: "";
			background: rgba(0, 0, 0, 0.6); /* Fondo translúcido (50% de opacidad) */
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
		}
		
		.login-box {
			border: 4px solid rgb(0, 123, 255);
			border-radius: 3%;
		}
		.card-outline {
			border-radius: 2%;
		}
</style>