import React from 'react';

class ComponenteClase extends React.Component {
    // Montaje
    constructor(props){
        super(props);
        this.state = {
            contador: 0,
            datos: null
        };

        // Ideal para:
        // -- Inicializar estado
        // -- Bind de métodos
        //this.methodName = this.methodName.bind(this);
    }

    // 1. Montaje
    componentDidMount(){
        // Ideal para:
        // - Llamadas API
        // - Suscripciones
        // - Modificar DOM
        this.cargarDatos();
    }

    // 2. Actualización
    // Se ejecuta antes de actualizar
    static getDerivedStateFromProps(props, state){
        // Ideal para:
        // - Actualizar estado bassado en cambios de props (propiedades)
        // Debe retornar un objeto para actualizar el estado o null
        return null;
    }

    shouldComponentUpdate(nextProps, nextState){
        // Ideal para:
        // - Optimización de rendimiento
        // Retorna true/false para permitir o evitar la actualización
    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        // Ideal para:
        // - Capturar información del DOM antes de actualizar
        // El valor retornado se pasa a componentDidUpdate
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        // Ideal para:
        // - Operar en el DOM después de una actualización
        // - Llamadas a red basadas en cambios

        if(prevState.contador !== this.state.contador){
            console.log('El contador cambió');
        }
    }

    // 3. Desmontaje
    componentWillUnmount(){
        // Ideal para:
        // - Limpieza (cancelar solicitudes, suscripciones)
        // - Eliminar event listeners
    }

    // 4. Manejo de Errores
    static getDerivedStateFromError(error){
        // Ideal para:
        // - Actualizar estado en caso de error

        return { hasError: true };
    }

    componentDidCatch(error, info){
        // Ideal para:
        // - Loggin de errores
        // - Mostrar UI de fallback
    }

    // Métodos auxiliares
    async cargarDatos(){
        try {
            const respuesta = await fetch('ruta');
            const datos = await respuesta.json();
            this.setState({datos});
        } catch (error) {
            
        }
    }

    render(){
        return (
            <div>
                <h2>Componente de Clase</h2>
                <p>Contador: {this.state.contador}</p>
                
            </div>
        )
    }

}