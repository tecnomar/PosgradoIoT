<div class="wrapper">
<!-- Navbar -->
<nav class="main-header navbar navbar-expand navbar-white navbar-light" aria-label="cabecera">
<!-- Left navbar links -->
<ul class="navbar-nav">
    <li class="nav-item">
    <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
    </li>
    <!-- <li class="nav-item d-none d-sm-inline-block">
    <a href="#" class="nav-link">Inicio</a>
    </li> -->
</ul>

<!-- Right navbar links -->
<ul class="navbar-nav ml-auto">
    <!-- Fullscreen -->
    <li class="nav-item">
    <a class="nav-link" href="logout" role="button">
        <i class="fas fa-sign-out-alt"></i>
    </a>
    </li>
    <li class="nav-item">
    <a class="nav-link" data-widget="fullscreen" href="#" role="button">
        <i class="fas fa-expand-arrows-alt"></i>
    </a>
    </li>
</ul>
</nav>
<!-- /.navbar -->

<!-- Main Sidebar Container -->
<aside class="main-sidebar sidebar-dark-primary elevation-4" aria-label="Main Sidebar Container">
<!-- Brand Logo -->
<a href="#" class="brand-link">
    <!-- <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8"> -->
    <span class="brand-text font-weight-light ml-5">Posgrado IOT</span>
</a>

<!-- Sidebar -->
<div class="sidebar">
    <!-- Sidebar user panel (optional) -->
    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
    <div class="image ml-3">
        <!-- <img src="dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image"> -->
    </div>
    <div class="info">
        <a href="#" class="d-block"><span>Usuario : </span><?php echo $_SESSION['usuario']; ?></a>
    </div>
    </div>

    <!-- Sidebar Menu -->
    <nav class="mt-2" aria-label="sidebarmenu">
    <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        <li class="nav-item">
        <a href="index" class="nav-link">
            <i class="fas fa-tachometer-alt"></i>
            <p class="p-3">
                Panel de Control
            </p>
        </a>
        </li>
        <li class="nav-item">
        <a href="actuador" class="nav-link">
            <i class="fas fa-ticket-alt"></i>
            <p class="p-3">
                Actuadores
            </p>
        </a>
        </li>
        <li class="nav-item">
        <a href="sensor" class="nav-link">
            <i class="fas fa-thermometer-quarter"></i>
            <p class="p-3 ml-2">
                Sensores
            </p>
        </a>
        </li>
        <!-- <li class="nav-item">
        <a href="ambiente" class="nav-link">
            <i class="fas fa-warehouse"></i>
            <p class="p-3">
                Ambientes
            </p>
        </a>
        </li> -->
        <li class="nav-item">
        <a href="usuario" class="nav-link">
            <i class="fas fa-user-cog"></i>
            <p class="p-3">
                Usuarios
            </p>
        </a>
        </li>
        
    </ul>
    </nav>
    <!-- /.sidebar-menu -->
</div>
<!-- /.sidebar -->
</aside>
