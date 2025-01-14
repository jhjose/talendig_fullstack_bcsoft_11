/*
    1. map(): itera sobre los elementos y genera una nueva lista.
    2. filter(): Filtra elementos basados en una condición.
    3. reduce(): Acumula valores en un solo resultado.
    4. sort(): Ordena los elementos.
    5. splice(): Añade o elimina elementos en posiciones específicas.
*/
import React from 'react';

const [items, setItems] = React.useState([
    {id: 1, name: 'Apple'},
    {id: 2, name: 'Banana'},
]);

function removeItem(id){
    setItems(items.filter(item => item.id !== id));
}

function ItemList(){
    return(
        <ul>
            {items.map(item => {
                <li key={item.id}>
                    {item.name} <button onClick={() => removeItem(item.id)}>Remove</button>
                </li>
            })} 
        </ul>
    )
}