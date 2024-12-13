// Nivel 1 - Conceptos básicos (variables, condicionales)
//let numberoSecreto = 7;
//let intento = 5;
/*
if(intento === numberoSecreto){
    console.log('Es positivo');
}else{
    console.log('Es negativo');
}*/


// Nivel 2 - Agregando ciclos (bucles) y validación
/*let numeroSecreto = Math.floor(Math.random() * 10) + 1;
let intentos = 0;
let adivinado = false;

while(intentos < 3 && !adivinado){
    let intento = parseInt(prompt("Adivina el número (1-10):"));
    intentos++;

    if(intento === numeroSecreto){
        adivinado = true;
        console.log(`Correcto!! Lo lograste en ${intentos} intentos.`);
    }else{
        let pista = intento < numeroSecreto ? "mayor" : 'menor';
        console.log(`Incorrecto. El número es ${pista} que ${intento}`);
    }
}

if(!adivinado){
    console.log(`Game Over. El número era ${numeroSecreto}`);
}
*/


// Nivel 3 - Versión avanzada con funciones y manejo de errores.
class JuegoAdivinanza {
    constructor(min = 1, max = 10, intentosMaximos = 3){
        this.min = min;
        this.max = max;
        this.intentosMaximos = intentosMaximos;
        this.numeroSecreto = this.generarNumeroAleatorio();
        this.intentos = 0;
        this.historialIntentos = [];
    }

    generarNumeroAleatorio(){
        return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    }

    validarIntento(intento){
        if(isNaN(intento)){
            throw new Error('Por favor ingresa un número válido');
        }
        if(intento < this.min || intento > this.max){
            throw new Error(`El número debe estar entre ${this.min} y ${this.max}`);
        }
        if(this.historialIntentos.includes(intento)){
            throw new Error("Ya intentaste este número antes.");
        }
    }

    hacerIntento(intento){
        try {
            this.validarIntento(intento);

            this.intentos++;
            this.historialIntentos.push(intento);

            if(intento === this.numeroSecreto){
                return {
                    resultado: "victoria",
                    mensaje: `Felicitaciones!! Adivinaste en ${this.intentos} intentos`,
                    terminado: true
                }
            }

            if(this.intentos >= this.intentosMaximos){
                return {
                    resultado: "derrota",
                    mensaje: `Game Over!! El número era ${this.numeroSecreto}`,
                    terminado: true
                }
            }

            const pista = this.generarPista(intento);

            return {
                resultado: "continuar",
                mensaje: pista,
                terminado: false
            }
        } catch (error) {
            return {
                resultado: "error",
                mensaje: error.message,
                terminado: false
            }
        }
    }

    generarPista(intento){
        const diferencia = Math.abs(this.numeroSecreto - intento);

        if(diferencia > 5){
            return "Estás muy lejos";
        }else if(diferencia > 2){
            return "Estás cerca";
        }else{
            return "Estás muy cerca";
        }
    }

}

// Ejemplo de uso:
const juego = new JuegoAdivinanza(1, 20, 5);

function jugar(intento){
    const resultado = juego.hacerIntento(parseInt(intento));
    console.log(resultado.mensaje);
    return !resultado.terminado;
}

jugar(7);