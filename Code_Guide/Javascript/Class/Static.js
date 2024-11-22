// La palabra clave 'static' se usa para definir métodos y propiedades que pertenecen a la clase
// en sí misma y no a las instancias (objetos) de la clase.

class MatematicasAvanzadas {
    // Propiedades estáticas - son compartidas por todas las instancias
    // y se acceden directamente desde la clase.
    static PI = 3.14159265359;
    static E = 2.71828182846;

    // Almacena el número de cálculos realizados
    static #contadorCalculos = 0; // Propiedad estática privada

    // Constructor normal para instancias
    constructor(){
        this.resultados = [];
    }

    // Getter estático para acceder a la propiedad privada
    static get totalCalculos(){
        return this.#contadorCalculos;
    }

    // Método estático para calcular el factorial de un número
    // No necesita una instancia para ser llamado
    static factorial(n){
        this.#contadorCalculos++; // Incrementa el contador de cálculos
        
        // Validación de entrada
        if(n < 0) throw new Error('No existe factorial de números negativos.');
        if(n === 0) return 1;

        let resultado = 1;

        for(let i = 2; i <= n; i++){
            resultado *= i;
        }
        return resultado;
    }

    // Método estático para calcular combinaciones (nCr)
    static calcularCombinaciones(n, r){
        this.#contadorCalculos++;
        // Usa el método factorial definido anteriormente
        return this.factorial(n) / (this.factorial(r) * this.factorial(n - r));
    }
}

// Ejemplo de uso
// Sin instanciación: let variable_name = new MatematicasAvanzadas();
console.log(MatematicasAvanzadas.PI);

// Calculando el factorial de 5
console.log(MatematicasAvanzadas.factorial(5)); // 120

// Calculando combinaciones
console.log(MatematicasAvanzadas.calcularCombinaciones(5, 2)); // 10