// Importancia de las Keys en React
// -- Mejora el rendimiento
// -- Prevención de errores

const numbers = [1, 2, 3, 4, 5];

export function NumberList(){
    return (
        <ul>
            {numbers.map(number => (
                <li key={number.toString()}>{number}</li>
            ))}
        </ul>
    )
}


const users = [
    { id: 1, name: 'Ana' },
    { id: 2, name: 'Delin'},
    { id: 3, name: 'Alexia'},
];

export function UserList(){
    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>
                    {user.name}
                </li>
            ))}
        </ul>
    )
}