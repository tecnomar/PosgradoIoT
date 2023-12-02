<?php
    if (session_status() == PHP_SESSION_ACTIVE && isset($_SESSION['usuario'])){
    include 'html/overal/head.php';
?>
<body class="hold-transition sidebar-mini">
    <?php
        include 'html/overal/header.php';
        include 'html/index/index.php';
        include 'html/overal/footer.php';
    } else {
        include 'core/controllers/loginController.php';
    }
    ?>
    <script src="assets/js/index.js?v=<?php echo NUM_ALEATORIO; ?>"></script>
</body>
