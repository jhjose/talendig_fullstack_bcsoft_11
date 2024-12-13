// TYPESCRIPT VS JAVASCRIPT

// 1. Tipos Básicos
// En Typescript (tipado estático)
let username: string = "jhon_test";
let ageUser: number = 25;

// username = 21; // Error en TS: Type 'number' is not assignable to type 'string'


// 2. VARIABLES Y TIPOS
// Typescript añade tipos específicos de datos
let isActiveUser: boolean = true;
let numbers: number[] = [1,2,3];
let tuple: [string, number] = ["hola", 6];
let anyData: any = 4; // Evitar usar 'any' cuando sea posible
let desconocido: unknown = 25;

// Union Types (solo en Typescript)
let stringOrNumber: string | number = 'hola'; // Puede ser un string o un número entero
//stringOrNumber = true; // Retorna error porque no está asignado


// 3. FUNCIONES
function sumarTS(a: number, b: number): number {
    return a + b;
}

// Parámetros opcionales y valores por defecto
function saludar(name: string, lastname?: string): any {
    return lastname ? `Hola ${name} ${lastname}` : `Hola ${name}`;
}


// 4. INTERFACES Y CLASES
// Interfaces (solo en Typescript)
interface User {
    name: string,
    age: number,
    married: boolean,
    saludar(): string,
}

// Clase implementando interface
class UserImplement implements User {
    constructor(public name: string, public age: number, public married: boolean){

    }

    saludar(): string {
        return `Hola, soy ${this.name}`;
    }

}


// 5. TIPOS AVANZADOS Y GENERICOS
// Type Alias
type Punto = {
    x: number,
    y: number
}

// Generics
interface Contenedor<T> {
    valor: T;
    mostrar(): void;
}

class ContenedorNumero implements Contenedor<number> {
    constructor(public valor: number){

    }

    mostrar(): void {
        console.log(this.valor);
    }
}


// 6. DECORADORES
// Los decoradores son una característica experimental en Typescript
// @decorator
function log(target: any, propertyKey: string){
    console.log(`Accediendo a ${propertyKey}`);
}

class Ejemplo {
    @log
    property: string = 'test';
}


// 7. MODULOS
// En ambos se pueden usar módulos de ES6
export interface Product {
    name: string,
    price: number,
}

export class ProductImpl implements Product {
    constructor(public name: string, public price: number){

    }
}

// Para importar debemos utilizar 'import'