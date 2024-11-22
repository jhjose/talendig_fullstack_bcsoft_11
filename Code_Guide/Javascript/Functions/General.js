// Se declara usando la palabra clave 'function'
// Tiene hoisting (puede ser llamada antes de su declaración)

// Uso de la función
console.log(saludar('Delin'));

function saludar(nombre){
	return "!Hola " + nombre + "!";
}


// Se asigna una función anónima a una variable
// No tiene hoisting
const sumar = function(a, b){
	return a + b;
}

console.log(sumar(5,9));


// Sintaxis más concisa, introducida en ES6
// No tiene su propio 'this'
const multiplicar = (a, b) => a * b;

// Con más de una línea de código
const dividir = (a, b)=>{
	if(b === 0) return "No se puede dividir por cero";

	return a / b;
}

console.log(multiplicar(4,2)); // Imprime: 8
console.log(multiplicar(10,6)); // Imprime: 60


// Se ejecuta inmediatamente después de ser definida
(function(){
	console.log(`Esta función se ejecuta inmediatamente se 
		carga este Script y después de esta definición`)
})();

// Con parámetros
((nombre)=>{
	console.log("Hola " + nombre);
})("Ana");