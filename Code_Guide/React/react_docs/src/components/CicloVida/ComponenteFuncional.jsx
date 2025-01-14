// COMPONENTES FUNCIONALES CON HOOKS
import React, {useState, useEffect} from 'react';

function ComponenteFuncional(){
    // Estado del componente
    const [contador, setContador] = useState(0);
    const [datos, setDatos] = useState(null);
    
    // 1. Montaje y Actualización (combinados)
    // Este useEffect se ejecuta después del primer render (montaje) y después de cada actualización
    useEffect(()=>{
        console.log('ComponenteFuncional: Montado o Actualizado');

        document.title = `Contador: ${contador}`;
    });

    // 2. Solo montaje ([] como dependencia)
    useEffect(()=>{
        // Ideal para cargar datos iniciales
        const cargarDatos = async()=>{
            const respuesta = await fetch('https://api.ejemplo.com/datos');
            const datos = await respuesta.json();

            setDatos(datos);
        }

        cargarDatos();

        // 3. Limpieza (similar a componentWillUnmount)
        return () => {
            // Limpia suscripciones, temporizadores, etc.
        }
    }, []); // [] significa que solo se ejecuta al montar

    // 4. Efecto con dependencias específicas
    // Se ejecuta cuando contador cambia
    useEffect(()=>{
        return ()=>{
            // Código que sea relevante a el estado contador
        }
    }, [contador]); // Se ejecuta cuando contador cambia

    return (
        <div>
            <h2>Componente Funcional</h2>
            <p>Contador: {contador}</p>
            <button onClick={()=>{setContador(c => c + 1)}}>
                Incrementar
            </button>
        </div>
    )
}