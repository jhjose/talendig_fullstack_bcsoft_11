class Objeto3D {
    constructor(posicion = {x: 0, y: 0, z: 0}, rotacion = {x: 0, y: 0, z: 0}){
        this.posicion = posicion;
        this.rotacion = rotacion;
        this.cargado = false;
        this.animando = false;
        this.frames = [];
        this.frameActual = 0;
    }

    async cargarModelo(){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                this.cargado = true;
                console.log('Modelo cargado exitosamente');
                resolve(true);
            }, 1500)
        });
    }

    // Añadir un frame a la animación
    agregarFrame(posicion, rotacion, duracion = 1000){
        this.frames.push({
            posicion: {...posicion},
            rotacion: {...rotacion},
            duracion
        });
    }

    // Reproducir la animación
    async reproducir(repeticiones = 1){
        if(!this.cargado){
            throw new Error('El modelo debe estar cargado antes de reproducir');
        }

        this.animando = true;

        for(let i = 0; i < repeticiones && this.animando; i++){
            for(let frame of this.frames){
                if(!this.animando) break;

                await this.moverA(frame.posicion);
                await this.rotar(frame.rotacion);
                await this.esperar(frame.duracion);

                this.frameActual = (this.frameActual + 1) % this.frames.length;
            }

            this.animando = false;
        }
    }

    // Detener la animación
    detener(){
        this.animando = false;
        console.log(`Animación pausada en frame ${this.frameActual}`);
    }

    // Pausar la animación en el frame actual
    pausar(){
        this.animando = false;
        console.log(`Animando pausada en frame ${this.frameActual}`);
    }

    async moverA(nuevaPosicion){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                this.posicion = {...nuevaPosicion};
                console.log(`Objeto movido a: x=${this.posicion.x}, y=${this.posicion.y}, z=${this.posicion.z}`)
                resolve(this.posicion);
            }, 500);
        });
    }

    async rotar(nuevaRotacion){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                this.rotacion = {...nuevaRotacion};
                console.log(`Objeto rotado a: x=${this.rotacion.x}, y=${this.rotacion.y}, z=${this.rotacion.z}`)
                resolve(this.rotacion);
            }, 500);
        });
    }

    async esperar(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    obtenerEstado(){
        return {
            posicion: this.posicion,
            rotacion: this.rotacion,
            cargado: this.cargado,
            animando: this.animando,
            frameActual: this.frameActual,
            totalFrames: this.frames.length,
        }
    }
    
}

// Ejemplo de uso con animación
async function main(){
    try{
        // Crear nuevo objeto 3D: instanciar
        const cubo = new Objeto3D();

        // Cargar el modelo
        console.log('Iniciando carga del modelo');
        await cubo.cargarModelo();

        // Definir frames de animación
        cubo.agregarFrame(
            {x: 0, y: 0, z: 0},
            {x: 0, y: 0, z: 0},
            1000
        );

        cubo.agregarFrame(
            {x: 10, y: 5, z: 3},
            {x: 45, y: 0, z: 0},
            1000
        );

        cubo.agregarFrame(
            {x: 10, y: 10, z: 3},
            {x: 45, y: 90, z: 45},
            1000
        );

        // Reproducir la animación 2 veces
        await cubo.reproducir(2);

        console.log('Animación completada');
        console.log('Estado final: ', cubo.obtenerEstado());

    }catch(error){
        console.error('Error: ', error);
    }
}

// Ejecutar función de arranque
main();