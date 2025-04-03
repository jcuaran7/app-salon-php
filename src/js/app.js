let paso = 1 ;
const pasoInicial = 1;
const pasoFinal = 3;

const cita = {
    id: '',
    nombre: '' ,
    fecha: '',
    hora: '',
    servicios:[]
}

document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();

})

function iniciarApp() {
    mostrarSeccion(); //muestra y oculta las secciones
    tabs();//cambia la funcion cuando se elija los tabs
    botonesPaginador(); //agrega o quita los botones al paginador
    paginaSiguiente();//funcion de pagina siguiente
    paginaAnterior(); //funcion pagina anterior
    consultarAPI(); //consulta la API en el backend de PHP
    nombreCliente(); //añade el nombre del cliente al objeto de cita
    idCliente();
    seleccionarFecha(); //añade la fecha de la cita en el objeto
    seleccionarHora(); //añade la hora de la cita en el objeto
    mostrarResumen();
    
}

function mostrarSeccion() {

    //ocultar la seccion que tenga la clase de mostrar
    const seccionAnterior = document.querySelector('.mostrar');

    if( seccionAnterior) {
        seccionAnterior.classList.remove('mostrar');
    }
    

    //seleccionar la seccion con el paso
    const pasoSelector =  `#paso-${paso}`
    const seccion = document.querySelector(pasoSelector);
    seccion.classList.add('mostrar');

    //quita la clase de actual al tab anterior

    const tabAnterior = document.querySelector('.actual');
    if(tabAnterior) {
        tabAnterior.classList.remove('actual');
    }

    //resalta el tab actual
    const tab = document.querySelector(`[data-paso="${paso}"]`);
    tab.classList.add('actual');

}

function tabs() {
    const botones = document.querySelectorAll('.tabs button')
    
    botones.forEach( boton => {
        boton.addEventListener('click', function(e) {
            paso = ( parseInt( e.target.dataset.paso) )

            mostrarSeccion();
            botonesPaginador();

        })
    })
}

function botonesPaginador() {
    const paginaSiguiente = document.querySelector('#siguiente');
    const paginaAnterior = document.querySelector('#anterior');

    if( paso===1 ) {
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }else if ( paso===3) {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');
        mostrarResumen();
    }else {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }
    mostrarSeccion();
}

function paginaAnterior() {
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', function() {
        if(paso<=pasoInicial) return; 
            paso--;
        
        botonesPaginador();
    })
}

function paginaSiguiente() {
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', function() {
        if(paso >= pasoFinal) return; 
            paso++;
        
        botonesPaginador();
    })
}

async function consultarAPI() {

    try {
        const url = '/api/servicios';
        const resultado = await fetch(url);
        const servicios = await resultado.json();
        mostrarServicios(servicios);

    } catch (error) {
        console.log(error)
    }
}

function mostrarServicios(servicios) {
    servicios.forEach( servicio => {
        const {id, nombre , precio} = servicio;

        const nombreServicio = document.createElement('P')
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$ ${precio}`;

        const servicioDiv = document.createElement('DIV')
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = function() {
            seleccionarServicio(servicio);
        }

        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);

        document.querySelector('#servicios').appendChild(servicioDiv);
    });
}

function seleccionarServicio(servicio) {
    const { id } = servicio;
    const { servicios } = cita;

    //identificar al elemento que se da click
    const divServicio = document.querySelector(`[data-id-servicio= "${id}"]`)

    //comprobar si un servicio ya fue agregado o quitarlo
    if( servicios.some ( agregado => agregado.id === id)) {
        //eliminarlo o quitarlo
        cita.servicios = servicios.filter( agregado => agregado.id !== id)
        divServicio.classList.remove('seleccionado');
    }else {
        //agregarlo
        cita.servicios = [...servicios, servicio];
        divServicio.classList.add('seleccionado');
    }
    

    //console.log(cita);
}

function nombreCliente() {
    cita.nombre = document.querySelector('#nombre').value;

}

function idCliente() {
    cita.id = document.querySelector('#id').value;

}


function seleccionarFecha() {
    const inputFecha = document.querySelector('#fecha');

    if (!inputFecha) {
        console.error("El elemento #fecha no existe.");
        return;
    }

    inputFecha.addEventListener('input', function(e) {
        const fechaSeleccionada = new Date(e.target.value);
        const diaSemana = fechaSeleccionada.getUTCDay(); // 0 = Domingo, 6 = Sábado

        // Lista de festivos en Colombia 2025 en formato YYYY-MM-DD
        const festivos = [
            "2025-01-01", // Año Nuevo
            "2025-01-06", // Reyes Magos
            "2025-03-24", // Día de San José
            "2025-04-17", // Jueves Santo
            "2025-04-18", // Viernes Santo
            "2025-05-01", // Día del Trabajo
            "2025-06-02", // Ascensión de Jesús
            "2025-06-23", // Corpus Christi
            "2025-06-30", // Sagrado Corazón de Jesús
            "2025-07-20", // Día de la Independencia
            "2025-08-07", // Batalla de Boyacá
            "2025-08-18", // Asunción de la Virgen
            "2025-10-13", // Día de la Raza
            "2025-11-03", // Todos los Santos
            "2025-11-17", // Independencia de Cartagena
            "2025-12-08", // Inmaculada Concepción
            "2025-12-25"  // Navidad
        ];

        // Convertir la fecha seleccionada a formato YYYY-MM-DD para comparación
        const fechaFormato = e.target.value;

        if ([6, 0].includes(diaSemana)) {
            e.target.value = "";
            mostrarAlerta('Fines de semana no permitidos', 'error', '.formulario');
        } else if (festivos.includes(fechaFormato)) {
            e.target.value = "";
            mostrarAlerta('Dias festivos no permitidos', 'error', '.formulario');
        } else {
            cita.fecha = e.target.value;
        }
    });
}

function seleccionarHora() {
    const inputHora = document.querySelector('#hora');

    inputHora.addEventListener('input', function (e) {
        let horaCita = e.target.value;

        // Verificar que el usuario haya ingresado una hora válida
        if (!horaCita) return;

        // Extraer hora y minutos
        let [hora, minutos] = horaCita.split(":").map(num => parseInt(num));

        // Validar que esté en el rango de 8:00 a 18:00 y que no sea la 1:00 PM
        if (hora < 8 || hora > 18 || hora === 13) {
            e.target.value = '';
            mostrarAlerta('Hora no válida', 'error', '.formulario');
            return;
        }

        // Si los minutos no son 00 o 30, corregir automáticamente al valor más cercano
        if (minutos !== 0 && minutos !== 30) {
            minutos = minutos < 30 ? 0 : 30; // Redondeo automático
        }

        // Aplicar la hora corregida
        let nuevaHora = `${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
        e.target.value = nuevaHora;

        // Guardar la hora en la variable de la cita
        cita.hora = nuevaHora;
    });
}





function mostrarAlerta(mensaje, tipo, elemento, desaparece = true) {

    //previene quese genere mas de una alaerta
    const alertaPrevia = document.querySelector('.alerta');
    if(alertaPrevia) {
        alertaPrevia.remove();
    }

    //generar alerta
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    const referencia = document.querySelector(elemento)
    referencia.appendChild(alerta);

    if(desaparece) {
    //eliminar alerta
    setTimeout(() => {
        alerta.remove();
    }, 3000);
    }

}

function mostrarResumen() {
    const resumen = document.querySelector('.contenido-resumen');

    
    //limpiar el contenido de resumen
    while(resumen.firstChild) {
        resumen.removeChild(resumen.firstChild)
    }

    if(Object.values(cita).includes ('') || cita.servicios.length === 0) {
        mostrarAlerta('Faltan datos de Servicios, Fecha u Hora', 'error', '.contenido-resumen', false)
        return;
    }

    //formatear el div de resumen
    const {nombre, fecha, hora, servicios} = cita;

    //heading para Servicios en resumen
    const headingServicios = document.createElement('H3')
    headingServicios.textContent ='Resumen de servicios';
    resumen.appendChild(headingServicios);

    //ITERANDO Y MOSTRANDO LOS SERVICIOS
    servicios.forEach(servicio=>  {

        const{ id, precio, nombre} = servicio;
        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');

        const textoServicio = document.createElement('P');
        textoServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.innerHTML = `<span>Precio:</span> $${precio}`;

        contenedorServicio.appendChild(textoServicio);
        contenedorServicio.appendChild(precioServicio);

        resumen.appendChild(contenedorServicio);
    })

    //heading para CITA en resumen
    const headingCita = document.createElement('H3')
    headingCita.textContent ='Resumen de Cita';
    resumen.appendChild(headingCita);

    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;

    //formatear la fecha en español
    const fechaObj = new Date(fecha);
    const mes = fechaObj.getMonth();
    const dia = fechaObj.getDate()+2;
    const year = fechaObj.getFullYear();

    const fechaUTC = new Date( Date.UTC(year, mes, dia));

    const opciones = { weekday: 'long', year:'numeric', month: 'long', day: 'numeric'};
    const fechaFormateada = fechaUTC.toLocaleDateString('es-CO', opciones);

    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`;

    const horaCita = document.createElement('P');
    horaCita.innerHTML = `<span>Hora:</span> ${hora} horas`;

    //Boton para crear cita
    const botonReservar = document.createElement('BUTTON');
    botonReservar.classList.add('boton');
    botonReservar.textContent = 'Reservar Cita';
    botonReservar.onclick = reservarCita;

    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);

    resumen.appendChild(botonReservar);
    
}

async function reservarCita() {
    const { fecha, hora, servicios, id} = cita;

    const idServicios = servicios.map( servicio=> servicio.id )
    

    const datos = new FormData();
    datos.append("usuarioId", id);
    datos.append('fecha', fecha);
    datos.append('hora', hora);
    datos.append('servicios', idServicios);


    try {
    //peticion hacia la api
    const url = '/api/citas'

    const respuesta = await fetch(url, {
        method: 'POST',
        body:datos
    });

    const resultado = await respuesta.json();
    console.log(resultado);

    if(resultado.resultado) {
        Swal.fire({
            icon: "success",
            title: "Cita creada",
            text: "Tu cita fue creada correctamente",
            confirmButtonText:'OK'
          }).then( () => {
            setTimeout(() => {
                window.location.reload();
            },3000);
          })
    }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error al guardar la cita"
          });
    }

    //console.log([...datos]);
}