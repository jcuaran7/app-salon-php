<h1 class="nombre-pagina">login</h1>
<p class="descripcion-pagina">Inicia Sesion con tus datos</p>

<?php include_once __DIR__ . "/../templates/alertas.php" ?>

<form action="/" method="post" class="formulario">

    <div class="campo">
        <label for="email">Email</label>
        <input 
            type="email"
            id="email"
            placeholder="Tu Email"
            name="email" 
        />
        <!-- El name sirve para enviarlo por post -->
    </div>

    <div class="campo">
        <label for="password">Password</label>
        <input 
            type="password"
            id="password"
            placeholder="Tu password"
            name="password"
        />
    </div>

    <input type="submit" class="boton" value="Iniciar Sesion" >
</form>

<div class="acciones">
    <a href="/crear-cuenta">¿Aun no tienes una cuenta? Crear una.</a>
    <a href="/olvide">¿Olvistaste tu password?</a>
</div>