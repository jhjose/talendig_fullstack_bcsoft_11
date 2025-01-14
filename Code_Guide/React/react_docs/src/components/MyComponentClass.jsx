import React from 'react';

class MyComponentClass extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            contador: 0,
            nombre: '',
            items: [],
            isLoading: false
        }
    }

    componentDidMount(){
        // Simular carga de datos
        this.setState({
            isLoading: true
        });

        fetch('https://api.ejemplo.com/items')
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setIsLoading(false);
            });

        console.log('this.state.items', this.state.items);    
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.contador !== this.state.contador){
            console.log('El contador se actualizó')
        }
    }

    handleIncrement = ()=>{
        this.setState(prevState => ({
            contador: prevState.contador + 1
        }));
    }

    handleNameChange = (event) => {
        this.setState({ nombre: event.target.name });
    }

    handleSubmit = (event)=>{
        event.preventDefault();
        console.log(
            'Formulario enviado: ', this.state.nombre
        );
    }

    render(){
        const { 
            contador, nombre, items, isLoading
        } = this.state;

        if(isLoading) return <div>Cargando...</div>

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
                    {
                        items.map(item => {
                            <li key={item.id}>
                                {item.name}
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }

}