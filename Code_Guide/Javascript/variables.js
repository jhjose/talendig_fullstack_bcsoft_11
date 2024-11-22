// ¿Cómo funcionan las variables en el computador?
/* -------Asignación en memoria: 
Declarar variables y el moetor de Javascript solicita un 
espacio en la memoria del sistema para almacenar ese valor. Cada variable se almacena en una 
dirección de memoria específica, y el sistema asigna un nombre a esa ubicación para poder 
accederla fácilmente.

---------- Tipos de datos y manejo en memoria
    Tipos primitivos: number, string, boolean, null y undefined son inmutables.
    --- Los valores de estos tipos se almacenan directamente en la memoria y son rápidos de procesar.

    Objetos y Arreglos (arrays): Estos se almacenan en el heap, una sección de la memoria dedicada a 
    almacenar datos complejos y estructuras más grandes.

---------- Garbage Collection (Recolección de Basura): 
    Javascript utiliza un proceso automático llamado recolección de basura para liberar la memoria ocupada por 
    variables y objetos que ya no se utilizan, evitando fugas de memoria.

---------- Ciclo de vida de una variable:    
    - Declaración: Se declara el tipo y nombre de variable.
    - Inicialización: Se asigna un valor inicial en memoria.
    - Uso: La variable se puede leer o modificar, dependiendo de su tipo (let o var se pueden reasignar, const no).
    - Desasignación: Cuando la variable ya no es accesible, el recolector de basura la elimina para liberar 
    memoria.
*/

/* Declaración de variable global */
var name = 'Juan de los Palotes'; // Declaración antigua de variables.

/* Variable que puede cambiar su valor, pero no puede declararse más de una vez */
let address = "<div>Calle 5, #25, Cien Fuego.</div><button>Enviar</button>"; // String.

const PI = 3.14159; // Integer o enteros

// `const` también tiene alcance de bloque
if(true){
    const gravedad = 9.8;
    //console.log('gravedad', gravedad); /* Output: 9.8 */
}

//console.log('gravedad', gravedad); /* Error: gravedad no está definido fuera del bloque */

const married = false; // Boolean: true or false, 1 or 0
let married_message = "";

if(name == 52){
    
}

if(name === 'Juan de los Palotes'){
    
}

if(married === true){
    // Ejecuta este código si es verdadero
    married_message = 'El usuario es casado.';
}else{
    married_message = 'El usuario no es casado.';
}

const password = '8521654';

name = "Gabriel del Rosario Sanchez";
address = "Calle 10, #1, Gurabo";

//console.log('name', name); // Output (salida): Juan de los Palotes


// Tipo `number`
let age = 25;
//console.log(age); // Output: 25

// Tipo `string`
let completeName = "Ana García";
//console.log(completeName);

// Tipo `null`
let vehicle = null;

if(vehicle !== age && age >= 18){
    
}

// Objeto (se declara con `const` para mantener la referencia fija)
const persona = {
    name: "Luis García",
    age: 17,
    address: address
}

/* Error al intentar transformar un objeto en un array (matriz) */
persona = ["Uno", "Dos", 58, ""];

persona.name = 'Maritza Peralta';

// Arreglo (Matriz, Colección)
const frutas = ['manzana', 'pera', 'naranja'];

console.log(persona)