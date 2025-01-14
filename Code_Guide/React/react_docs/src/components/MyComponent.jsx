import { useEffect, useState } from "react";

function MyComponent({property_1, property_2}){
    
    // Estados
    const [contador, setContador] = useState(0);
    const [nombre, setNombre] = useState('');
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Efecto para cargar datos (equivalente a componentDidMount en componentes de clases)
    useEffect(()=>{
        setIsLoading(true);

        fetch('https://api.ejemplo.com/items')
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setIsLoading(false);
            });

        console.log('items', items);
    }, [nombre]);

    useEffect(()=>{
        console.log('El contador se actualizó')
    }, [contador]);


    const handleIncrement = ()=>{
        setContador(prevContador => prevContador + 1);
    }

    const handleNameChange = (event) => {
        setNombre(event.target.value);
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        console.log('Formulario enviado: ', nombre);
    }

    return (
        <div>
            <h1>Contador: {contador}</h1>
            <button onClick={this.handleIncrement}>
                Incrementar
            </button>

            <form onSubmit={this.handleSubmit}>
                <input 
                    type="text" 
                    value={nombre}
                    onChange={handleNameChange}
                    placeholder="Ingresa tu nombre"
                />
                <button type="submit">Enviar</button>
            </form>

            <ul>
                {memoizedItems}
            </ul>
        </div>
    )
}

export default MyComponent;

