// Funciones Síncronas:
/* Se ejecutan en orden secuencial, bloqueando la ejecución de las demás funciones hasta que cada operación
se complete. */

// Ejemplo 1: Función síncrona simple
function sumarNumeros(a, b){
    return a + b; // Se ejecuta inmediatamente y retorna el resultado
}

// Ejemplo 2: Función síncrona que procesa un array
function procesarArraySincrono(array){
    // El código se ejecuta línea por línea, esperando que cada operación termine.
    const resultado = array.map(num => num * 2);
    const filtrado = resultado.filter(num => num > 5);

    return filtrado;
}


// Funciones Asíncronas:
// Permiten ejecutar operaciones sin bloquear el hilo principal.
// Pueden usar 'async/await' o Promesas.

// EJemplo 1: que simula una petición a API
async function obtenerDatosUsario(id){
    try{
        // await pausa la ejecusión hasta que la promesa se resuelva.
        const response = await fetch(`https://api.ejemplo.com/usuarios/${id}`);
        const datos = await response.json();

        return datos;
    }catch(error){
        throw error;
    }
}

// Ejemplo 2: Función asíncrona con setTimeout.
function esperarSegundos(segundos){
    return new Promise((resolve)=>{
        // setTimeout es asíncrono y no bloquea el código.
        setTimeout(()=>{
            resolve(`Han pasado ${segundos} segundos.`);
        }, segundos * 1000); // Milisegundos
    });
}

const funcionAsincronaDeFlecha = async ()=>{
    return await fetch(`https://dominio.com/ruta`);
}

// Ejemplo de uso de la función asíncrona con await
async function ejecutarSecuencia(){
    console.log('Iniciando secuencia...');

    // Esta línea esperará 2 segundos pero no bloqueará el programa.
    const resultado = await esperarSegundos(2);
    console.log('Resultado: ', resultado);

    // El código continúa ejecutándose después de los 2 segundos
    console.log('Secuencia completada');
}

// Ejemplo 3: Múltiples operaciones asíncronas en paralelo.
async function obtenerMultiplesDatos(){
    try{
        // Promise.all permite ejecutar múltiples promesas en paralelo.
        const resultado = await Promise.all([
            obtenerDatosUsario(1),
            obtenerDatosUsario(2),
            esperarSegundos(3),
        ]);

        return resultados;
    }catch(error){
        throw error;
    }
}