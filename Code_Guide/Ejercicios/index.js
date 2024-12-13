let number = "5";
let result = number + 10; // Resultado: 510


/*if(5 == '5'){
    console.log('Son iguales')
}


for(let i = 5; i >= 0; i--){
    console.log(i); // Imprime: 5, 4, 3, 2, 1, 0
}
*/

/*function ejemploScope(){
    if(true){
        let x = 10;
    }

    console.log(x); // X está definido fuera de bloque
}*/


let array = [1, 2, 3];
let arrayOtroTipo = new Array();

array = []; // Mantiene estructura del array

array.length = 0; // Crea una estructura del array

//console.log('array', array);


// Incorrecta
function obtenerDatos(){
    let datos;

    fetch('https://api.ejemplo.com/datos')
        .then(response => {
            datos = response.json();
        });
    
    return datos; // Retornará undefined
}

// Correcta
async function obtenerDatos(){
    try {
        const response = await fetch('https://api.ejemplo.com/datos');
        const datos = await response.json();
        
        return datos;
    } catch (error) {
        console.error('Error: ', error);
    }
}

/*obtenerDatos().then(res => {
    datos = res.json();
    return datos;
}).catch(error => {
    console.error(error);
}); */