var preguntas = [
    "¿Cuál es la capital de España?",
    "¿Cuál es la capital de Francia?",
    "¿Cuál es la capital de Italia?",
    "¿Cuál es la capital de Alemania?",
    "¿Cuál es la capital de Japón?",
    "¿Cuál es la capital del Reino Unido?",
    "¿Cuál es la capital de México?"
];

var banderas = [
    "AUDIOS Y BANDERA/ESPAÑA.jpg",
    "AUDIOS Y BANDERA/FRANCIA.jpg",
    "AUDIOS Y BANDERA/ITALIA.jpg",
    "AUDIOS Y BANDERA/ALEMANIA.avif",
    "AUDIOS Y BANDERA/JAPON.jpg",
    "AUDIOS Y BANDERA/REINO UNIDO.jpg",
    "AUDIOS Y BANDERA/MEXICO.jpg"
];

var audios = [
    "AUDIOS Y BANDERA/ESPAÑA.mp3",
    "AUDIOS Y BANDERA/FRANCIA.mp3",
    "AUDIOS Y BANDERA/ITALIA.mp3",
    "AUDIOS Y BANDERA/ALEMANIA.mp3",
    "AUDIOS Y BANDERA/JAPON.mp3",
    "AUDIOS Y BANDERA/REINO UNIDO.mp3",
    "AUDIOS Y BANDERA/MEXICO.mp3"
];
var opciones = [
    ["Madrid", "Barcelona", "Valencia", "Sevilla"],
    ["Lyon", "Marsella", "Paris", "Toulouse"],
    ["Venecia", "Milán", "Florencia", "Roma"],
    ["Hamburgo", "Berlín", "Múnich", "Frankfurt"],
    ["Osaka", "Tokio", "Kioto", "Hiroshima"],
    ["Liverpool", "Londres", "Manchester", "Birmingham"],
    ["Guadalajara", "Cancún", "Monterrey", "Ciudad de México"]
];

var puntajes = [
    [1, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 1]
];
var i = 0;
var puntajeFinal=0;

function respuesta_correcta() {
    for (var d = 0; d < 4; d++) {
        if (puntajes[i][d] > 0) {
            return d
        }
    }
}


function controlarMusica() {
    // Obtener elementos
    const musicButton = document.getElementById("musicButton");
    const audioPlayer = document.getElementById("audioPlayer");
  
    let isPlaying = false;
  
    // Aquí le pones el color rojo al iniciar
    musicButton.style.backgroundColor = "#FF6347";
  
    // Función para controlar la música
    function toggleMusic() {
      if (isPlaying) {
        audioPlayer.pause();  // Detener la música
        musicButton.style.backgroundColor = "#FF6347";  // Color rojo
        isPlaying = false;
      } else {
        audioPlayer.play();   // Reproducir música
        musicButton.style.backgroundColor = "#4CAF50";  // Color verde
        isPlaying = true;
      }
    }
  
    // Asignar el evento al botón
    musicButton.addEventListener("click", toggleMusic);
  }
  
  
  // Llamar a la función al cargar la página
  controlarMusica();
  

function siguientePregunta() {
    for (var x = 1; x <= 4; x++) {
        document.getElementById("op" + x).style.backgroundColor = "white"; // Ponemos todos los botones en rojo
    }
    document.getElementById("pregunta").innerHTML = preguntas[i];
    document.getElementById("op1").innerHTML = opciones[i][0];
    document.getElementById("op2").innerHTML = opciones[i][1];
    document.getElementById("op3").innerHTML = opciones[i][2];
    document.getElementById("op4").innerHTML = opciones[i][3];
    document.getElementById("barra-progreso").value = i * 100 / preguntas.length;
    document.getElementById("imgg").src = banderas[i]; // Cambiar el src

    var audioElement = document.getElementById("audioPlayer");
    audioElement.src = audios[i] // Cambia el src del audio
    audioElement.play(); // Reproduce el audio


}

siguientePregunta();

function actualizar(opcion) {
    var indice = opcion - 1;
     puntajeFinal += puntajes[i][indice];
    console.log(puntajeFinal);
    color_respuestas();
    if(puntajes[i][indice] >0){
    var audioElement = document.getElementById("audioPlayer");
    audioElement.src = "AUDIOS Y BANDERA/punto.mp3" // Cambia el src del audio
    audioElement.play(); // Reproduce el audio
    }else{
        var audioElement = document.getElementById("audioPlayer");
        audioElement.src = "AUDIOS Y BANDERA/perdiste.mp3" // Cambia el src del audio
        audioElement.play(); // Reproduce el audio
    }
    setTimeout(function () {
        i++ //i= i+1
        if (i < preguntas.length) {
           
            siguientePregunta();
        } else {
            mostrarResultado();
        }
    }, 3000);
    

}

document.getElementById("op1").addEventListener("click", function () {
    document.getElementById("op1").style.backgroundColor = "grey";
    setTimeout(function () {
        actualizar(1);
    }, 1000);
})
document.getElementById("op2").addEventListener("click", function () {
    document.getElementById("op2").style.backgroundColor = "grey";
    setTimeout(function () {
        actualizar(2);
    }, 1000);
})


document.getElementById("op3").addEventListener("click", function () {
    document.getElementById("op3").style.backgroundColor = "grey";
    setTimeout(function () {
        actualizar(3);
    }, 1000);
})

document.getElementById("op4").addEventListener("click", function () {
    document.getElementById("op4").style.backgroundColor = "grey";
    setTimeout(function () {
        actualizar(4);
    }, 1000);
})



function color_respuestas() {
    var resp = respuesta_correcta();

    for (var x = 1; x <= 4; x++) {
        document.getElementById("op" + x).style.backgroundColor = "red"; // Ponemos todos los botones en rojo
    }

    
    var verde = resp + 1;
    var final = "op" + verde;
   
    document.getElementById(final).style.backgroundColor = "green";

}


function mostrarResultado() {
    // Se remueven los hijos del div con clase "card", dentro de él agregaremos los resultados
    var div = document.getElementsByClassName("question")[0];
    div.innerHTML = "";

    // Se agregan los elementos correspondientes a los resultados
    div.innerHTML += "<h3 class='resultado_titulo'>Resultados</h3>";

    // Determinamos el rendimiento en base al puntaje
    let rendimiento;
    if (puntajeFinal === preguntas.length) {
        rendimiento = "<span id='estilo-excelente'>¡Increíble! Respondiste todas correctamente.</span>";
    } else if (puntajeFinal > preguntas.length / 2) {
        rendimiento = "<span id='estilo-bueno'>¡Bien hecho! Respondiste más de la mitad correctamente.</span>";
    } else {
        rendimiento = "<span id='estilo-regular'>¡Sigue practicando! No todas las respuestas fueron correctas.</span>";
    }

    // Agregamos el puntaje final y el mensaje de rendimiento
    div.innerHTML += `<p class='resultado_obtenido'> ${rendimiento} , lo cual significa que tu IQ en países es ${puntajeFinal} /7.</p>`;
    // Agregamos un botón para refrescar la página
    div.innerHTML += `<button id="refreshButton" style="margin-top: 20px; padding: 10px; cursor: pointer;">Volver a Jugar</button>`;
    
    var audioElement = document.getElementById("audioPlayer");
    audioElement.src = "AUDIOS Y BANDERA/gano.mp3" // Cambia el src del audio
    audioElement.play(); // Reproduce el audio
    // Activamos la función de recargar cuando hagan click
    const botonRefrescar = document.getElementById("refreshButton");
    botonRefrescar.addEventListener("click", function() {
        location.reload();
    });
}





