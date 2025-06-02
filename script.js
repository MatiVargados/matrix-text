////////////////////////
// PREPARAR EL CANVAS //

/*Que es canvas?
Es un lienzo rectangular dentro de una página web donde se pueden dibujar gráficos y animaciones utilizando scripts, típicamente JavaScript
Para dibujar en el lienzo, se necesita acceder a un contexto de renderización, que puede ser de 2D o 3D (con WebGL)*/

// Obtenemos el elemento canvas del html
const canvas = document.getElementById("canvas");
// Ponemos el contexto en 2d
const ctx = canvas.getContext("2d");
// Ajustamos el tamanio a la ventana del navegador | con las constantes de canva |
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/////////////////////
// CONFIGURACIONES //

// Velocidad 
let velocidadAparicion = 1; // se recomienda min 1 | max 10 
// Color
let colorTexto = "rgb(255, 110, 214)";
// Texto
let texto = "I LOVE YOU";

//////////
//FONDO //

// Tamaño de las letras
let fontSize = 16;
//  Cantidad de columnas (horizontales)
let columns = canvas.width / fontSize;
//  Array que guarda la posición vertical de cada columna de texto 
//  Inicialmente todas comienzan en la fila 1 / arriba del todo
let drops = Array(Math.floor(columns)).fill(1);


function dibujoMatrix() {

    // dibuja un rectangulo semitransparente en todo el canvas / web
    ctx.fillStyle = "rgba(0, 0, 0, 0.10)"; // le da el color medio transaparente para que vaya cubriendo de apoco y darle el efecto de desvanecimiento
    ctx.fillRect(0, 0, canvas.width, canvas.height); // le da la forma

    // configura el formato del texto
    ctx.fillStyle = colorTexto; // da el color al texto (el color se elige antes)
    ctx.font = `${fontSize}px monospace`; // da la dimension de las letras (todas con el mismo ancho)

    // recorre todas las columnas del drops / canvas / web
    for (let i = 0; i < drops.length; i++) {
        // dibuja el texto en toda la columna y fila de drops[i]
        ctx.fillText(texto, i * fontSize, drops[i] * fontSize);
        // si la columna del canvas llego al fondo o el random entra en la condicion corta (para que no tengan la misma longitud)
        if (drops[i] * fontSize > canvas.height || Math.random() > 0.975) { 
          // se reinicia la columna              //| este random esta entre el 1 y el 0, con una condicion que tiene que ser mayor del 0,975|
          drops[i] = 0;                          //| haciendo que la probabilidad de que entre a la condicion sea del 2,5%                  |
        };
        // va hacia abajo sumando la velocidad
        drops[i] += velocidadAparicion;
    };
};

// Esta funcion activa la funcion dibujarMatrix cada 80 milisegundos
setInterval(dibujoMatrix, 80);

////////////////////
// REHACER CANVAS //

// En el caso de que se cambie la resolucion 
// Se escucha el evento y redisenia la web
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = canvas.width / fontSize;
  drops = Array(Math.floor(columns)).fill(1);
});