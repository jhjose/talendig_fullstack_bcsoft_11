// useContext, useReducer, useRef, useMemo y useCallback
import React, {useContext, createContext, useReducer, useRef, useMemo, useCallback} from 'react';

// 1. useContext
//const value = useContext(MyContext);
const ThemeContext = createContext();

function App(){
    return (
        <ThemeContext.Provider value='dark'>
            <Toolbar />
        </ThemeContext.Provider>
    );
}

function Toolbar(){
    return <ThemedButton />
}

function ThemedButton(){
    const theme = useContext(ThemeContext);
    return <button className={theme}>Theme: {theme}</button>
}


// 2. useReducer
const initialState = {customer_count: 0};

function reducer(state, action){
    switch (action.type){
        case 'increment':
            return {count: state.customer_count + 1};
        case 'decrement':
            return {count: state.customer_count - 1};
        default:
            return state        ;
    }
}

export function CustomerCounter(){
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            <p>Count: {state.count}</p>
            <button onClick={()=>dispatch({type: 'increment'})}>Cliente nuevo</button>
            <button onClick={()=>dispatch({type: 'decrement'})}>Cliente perdido</button>
        </div>
    )
}


// 3. useRef
export function SizeImage(){
    const imageRef = useRef();

    const sizeImage = ()=>{
        imageRef.current.style.height = 400;
        imageRef.current.style.width = 600;
    }

    return (
        <div>
            <img src="" alt="" height={200} width={400} ref={imageRef} />
            <button onClick={sizeImage}>Change Image Size</button>
        </div>
    )
}


// 4. useMemo
// Memoriza el resultado de una función para evitar ejecutarla en cada render.
export function ExpensiveCalculation({num}){
    const calculateFactorial = (n) => {
        console.log('Calculando factorial...');
        return n <= 0 ? 1 : n * calculateFactorial(n - 1)
    }

    const factorial = useMemo(()=>calculateFactorial(num), [num]);

    return <div>Factorial: {factorial}</div>
}


// 5. useCallback
// Devuelve una versión memorizada de una función que solo cambia
// si las dependencias cambian.
// const momoizedCallback = useCallback(() => { doSomethin(a, b); }, [a, b])
export function Counter(){
    const [count, setCount] = useState(0);
    const increment = useCallback(()=>{
        setCount(c => c + 1);
    }, [])

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
        </div>
    )
}