// 1. useState
// -- Se utiliza para agregar estado a un componente funcional.
import React, {useState, useEffect, useContext, createContext, useRef, useReducer} 
    from 'react';

export function Contador(){
    const [contador, setContador] = useState(0);

    return (
        <div>
            <p>Has hecho clic {contador} veces</p>
            <button onClick={()=>setContador(contador + 1)}>
                Incrementar
            </button>
        </div>
    )
}


// 2. useEffect
// Se emplea para gestionar efectos secundarios, como llamadas a APIs o manipulaciones de DOM
export const Ejemplo = ()=>{
    const [contador, setContador] = useState(0); 

    useEffect(()=>{
        document.title = `Has hecho clic ${contador} veces`;
    }, [contador]);

    return (
        <div>
            <p>Has hecho clic {contador} veces</p>
            <button onClick={()=>setContador(contador + 1)}>
                Incrementar
            </button>
        </div>
    )
}


// 3. useContext
// Permite acceder al contexto en cualquier parte del árbol de componentes
const ThemeContext = createContext('light'); // light, dark

const ThemeButton = ()=>{
    const theme = useContext(ThemeContext);
    
    return <button style={{background: theme === 'light' ? '#fff' : '#333'}}>
        Botón
    </button>
}


// 4. useRef
// -- Se utiliza para acceder directamente a un elemento del DOM o para mantener una referencia
// mutable
function InputEnfocado(){
    const inputRef = useRef(null);

    const enfocarInput = ()=>{
        inputRef.current.focus();
        inputRef.current.style.background = 'red';
    }

    return (
        <div>
            <input id='input_name' ref={inputRef} type="text" />
            <button onClick={enfocarInput}>Enfocar</button>
        </div>
    )
}


// 5. useReducer
// Ideal para manejar lógica de estado compleja
const initialState = {contador: 0};

function reducer(state, action){
    switch(action.type){
        case 'incrementar':
            return {contador: state.contador + 1};
        case 'decrementar':
            return {contador: state.contador - 1};
        default:
            return state;    
    }
}

function Contador(){
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            <p>Contador: {state.contador}</p>
            <button onClick={()=> dispatch({type: 'incrementar'})}>+</button>
            <button onClick={()=> dispatch({type: 'decrementar'})}>-</button>
        </div>
    )
}


// Hooks Personalizados
export function useFetch(url){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
    }, [url]);

    return {data, loading}
}


// Obtener valores con target
export function Cliente(){

    function add(event){
        const value = event.target.value;
        const valueSame = document.getElementById('add_input')
    }

    return (
        <div>
            <input id="add_input" type="text" onChange={add} />
        </div>
    )
}