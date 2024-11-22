// 1. CONCEPTOS BASICOS

// Clase - Plantilla para crear objetos
class Persona {
    // Constructor - método que inicializa el objeto
    constructor(nombre, edad){
        this.nombre = nombre;
        this.edad = edad;
    }

    // Método
    saludar(){
        return `Hola, soy ${this.nombre} y tengo ${this.edad} años`;
    }
}

// Instanciación de un objeto
const persona1 = new Persona("Jhonatan Martinez", 19);
console.log(persona1.saludar());


// 2. HERENCIA
class Empleado extends Persona {
    constructor(nombre, edad, salario){
        // super llama al constructor de la clase padre
        super(nombre, edad);
        this.salario = salario;
    }

    // Sobrescritura de métodos
    saludar(){
        return `${super.saludar()} y gano $${this.salario}.`;
    }
}

const empleado1 = new Empleado("Carlos Rodriguez", 34, 2500);
console.log(empleado1.saludar()); // "Hola, soy Carlos Rodriguez y tengo 30 años y gano $2500."


// 3. ENCAPSULACION
// Usando campos privados (disponible en navegadores modernos)
class CuentaBancaria {
    #saldo; // Campo privado

    constructor(saldoInicial){
        this.#saldo = saldoInicial;
    }

    // Getter
    getSaldo(){
        this.depositar(100);
        
        return this.#saldo;
    }

    // Setter
    depositar(cantidad){
        if(cantidad > 0){
            this.#saldo += cantidad;
            return true;
        }

        return false;
    }

    getMethodX(){

    }
}


// 4. POLIMORFISMO
class Figura {
    calcularArea(){
        return 0;
    }
}

class Circulo extends Figura {
    constructor(radio){
        super();
        this.radio = radio;
    }

    calcularArea(){
        return Math.PI * this.radio **2; // Operador de exponenciación
    }
}

class Rectangulo extends Figura {
    constructor(base, altura){
        super();
        this.base = base;
        this.altura = altura;
    }

    calcularArea(){
        return this.base * this.altura;
    }
}


// 5. Composición
class Motor {
    arrancar(){
        return "Motor arrancado";
    }
}

class Coche {
    constructor(){
        this.motor = new Motor();
    }

    encender(){
        return this.motor.arrancar();
    }
}


// 6. PATRONES AVANZADOS
// Singleton
class Singleton {
    static #instancia;

    constructor(){
        if(Singleton.#instancia){
            return Singleton.#instancia;
        }
        Singleton.#instancia = this;
    }

    static getInstance(){
        if(!Singleton.#instancia){
            Singleton.#instancia = new Singleton();
        }
        return Singleton.#instancia;
    }
}


// Factory Method
class CreadorDocumento {
    crearDocumento(tipo){
        switch(tipo){
            case 'pdf':
                return new PDF();
            case 'word':
                return new Word();
            default:
                throw new Error('Tipo de documento no soportado.')    
        }
    }
}


// 7. Mixins
const habladarMixin = {
    hablar(){
        return `${this.nombre} está hablando.`;
    }
}

// Aplicar mixin a una clase
Object.assign(Persona.prototype, habladarMixin);