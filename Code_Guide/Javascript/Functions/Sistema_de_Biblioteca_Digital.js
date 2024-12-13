// Simulación de una base de datos
const baseDeDatos = {
    libros: new Map(),
    usuarios: new Map(),
    prestamos: new Map(),
}

// Clase para gestionar la biblioteca
class BibliotecaDigital {
    // Variables privadas
    #latencia = 0;

    // Simula la latencia de una base de datos real.
    async #simularLatencia(){
        return new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
    }

    // Agregar un nuevo libro
    async create(isbn, titulo, autor){
        await this.#simularLatencia();

        if(baseDeDatos.libros.has(isbn)){
            throw new Error('El libro ya existe.');
        }

        baseDeDatos.libros.set(isbn, {
            isbn, titulo, autor, disponible: true, copias 
        });

        return {message: 'Libro agregado exitosamente.'};
    }

    async buscarLibros(criterio){
        await this.#simularLatencia();
        // María no es lo mismo que maría con include
        const resultados = Array.from(baseDeDatos.libros.values()).filter(libro => {
            libro.titulo.toLowerCase().includes(criterio.toLowerCase()) || 
            libro.autor.toLowerCase().includes(criterio.toLowerCase());
        });

        return resultados;
    }

    // Procesar devolución de libro
    async devolverLibro(isbn, usuarioId){
        await this.#simularLatencia();

        const libro = baseDeDatos.libros.get(isbn);

        if(!libro){
            throw new Error('Libro no encontrado.');
        }

        libro.disponible = true;

        // Encontrar y actualizar el préstamo
        for(let [id, prestamo] of baseDeDatos.prestamos){
            if(prestamo.isbn === isbn && prestamo.usuarioId === usuarioId){
                prestamo.fechaDevolucion = new Date();
                break;
            }
        }

        await this.enviarNotificacion(usuarioId, `Devolución procesada: ${libro.titulo}`);

        return {
            message: 'Libro devuelto exitosamente.'
        };

    }
}