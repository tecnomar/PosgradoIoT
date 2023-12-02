<div id="modal_preloader" class="modal" style="width: 100%; height: 100%;">
    <div class="">
      <div id="contenedor_carga">
        <div id="carga">
        
        </div>
    </div>
    </div>
</div>

<style>
#contenedor_carga{
    background-color: rgba(250, 240, 245, 0.9);
    height: 100%;
    width: 100%;
    -webkit-transition: all 1s ease;
    -o-transition: all 1s ease;
    transition: all1s ease;
    z-index:  100000;   
}
#carga{
    border: 15px solid #ccc;
    border-top-color: #F4266A;
    border-top-style: groove;
    height: 100px;
    width: 100px;
    border-radius: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 40vh auto;
    overflow: hidden;
    -webkit-animation: girar 1s linear infinite;
    -o-animation: girar 1s linear infinite;
    animation: girar 1s linear infinite;
}
@keyframes girar {
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
}
</style>