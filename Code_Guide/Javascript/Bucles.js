const empleados = [
    {name: 'Felix Cueva', edad: 26},
    {name: 'Alexia Segura Subervi', edad: 26},
];

// 1. Bucle for clásico
for(let i = 0; i < empleados.length; i++){
    //console.log(empleados[i]);
}

// 2. Bucle while
let contador = 0;

while(contador < empleados.length){
    //console.log(contador)
    contador++;
}

// 3. Bucle do-while (se ejecuta al menos una vez)
let num = 0;
do {
   num++;
}while(num <= 1);

// 4. for...of (para iterar elementos de arrays)
const frutas = ['Manzana', 'Banana', 'Naranja'];
for(const fruta of frutas){
    //console.log(fruta); // 0 = Manzana, 1 = Banana y 2 = Naranja
}

// 5. for...in (para iterar propiedades de objetos)
const user = {
    name: "Freddy Peralta",
    age: 38,
    city: 'New York'
}

for(const property in user){
    //console.log(`${property}: ${user[property]}`);
}

// 6. Bucle con break y continue
for(let i = 0; i < 10; i++){
    if(i === 3) continue; // Salta la interación cuando i es 3

    if(i === 7) break; // Termina el ciclo del bucle cuando i es 7
    
}

// 7. Bucles anidados con arrays multidimensionales
const matriz = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];

for(let i = 0; i < matriz.length; i++){
    for(let j = 0; matriz[i].length; j++){
        console.log(`Posición [${i}][${j}]: ${matriz[i][j]}`);
    }
}