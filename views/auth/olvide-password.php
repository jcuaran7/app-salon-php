<h1 class="nombre-pagina"></h1>
<p class="descripcion-pagina">Reestablece Tu Password escribiendo tu email a continuacion</p>

<?php include_once __DIR__ . "/../templates/alertas.php" ?>

<form action="/olvide" class="formulario" method="post" >

<div class="campo">
    <label for="email"> Email</label>
    <input 
    type="email"
    id="email"
    name="email"
    placeholder="Tu email"
    >
</div>

<input type="submit" class="boton" value="Enviar Instrucciones">

</form>

<div class="acciones">
    <a href="/">¿Ya tienes una Cuenta? Inicia Sesion.</a>
    <a href="/crear-cuenta">¿Aun no tienes una cuenta? Crear una.</a>
    
</div>