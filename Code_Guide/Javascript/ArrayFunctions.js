/* ARRAY FUNCTIONS
    filter(): es excelente para obtener un subconjunto de elementos que cumplen cierta condición.
    map(): es útil para transformar datos de un formato a otro.
    reduce(): es muy versátil para procesar datos y obtener resultados acumulados.
    sort(): permite ordenar elementos según diferentes criterios.
    reverse(): simplemente invierte el orden de los elementos.
*/

// Datos de ejemplo
const productos = [
    {id: 1, nombre: "Laptop", precio: 1200, categoria: "Electrónica"},
    {id: 2, nombre: "Smartphone", precio: 800, categoria: "Electrónica"},
    {id: 3, nombre: "El Señor de los Anillos", precio: 25, categoria: "Libros"},
    {id: 4, nombre: "Auriculares", precio: 100, categoria: "Electrónica"},
    {id: 5, nombre: "Revista", precio: 10, categoria: "Libros"},
];

// Filtrar productos de Electrónica
const electrodicos = productos.filter(producto => producto.categoria === "Electrónica");

// Filtrar productos con precio menor a 500
const productosBaratos = productos.filter(producto => producto.precio < 500);


// MAP: Crea un nuevo array transformando cada elemento según una función.
// Obtener solo los nombres de los productos
const nombres = productos.map(producto => producto.nombre);

// Crear nuevo array con nombres y precios formateados
const productosFormateados = productos.map(producto => ({
    nombre: producto.nombre,
    precioFormateado: `DO$ ${producto.precio}`,
}));


// REDUCE
// Reduce procesa un array y lo reduce a un único valor
// Calcular el total de precios
const precioTotal = productos.reduce((acumulador, producto)=>{
    return acumulador + producto.precio;
}, 0);

//console.log('Precio total: ', precioTotal);

// Agrupar productos por categoría
const porCategoria = productos.reduce((acumulador, producto)=>{
    if(!acumulador[producto.categoria]){
        acumulador[producto.categoria] = [];
    }
    acumulador[producto.categoria].push(producto);

    return acumulador;
}, {});

//console.log('Agrupados por categorías: ', porCategoria);


// SORT: ordena los elementos del array (modifica el array original)
// Ordenar por precio (ascendente)
const ordenadosPorPrecio = [...productos].sort((a,b) => a.precio - b.precio);

// Ordenar por nombre (alfabéticamente)
const ordenadosPorNombre = [...productos].sort((a, b) =>
    a.nombre.localeCompare(b.nombre)
);
//console.log('Ordenados por nombre: ', ordenadosPorNombre);


// REVERSE: invierte el orden de los elementos (modifica el array original)
const productosRevertidos = [...productos].reverse();
//console.log('productos: ', productos);
//console.log('productosRevertidos: ', productosRevertidos);


// ENCADENAMIENTO DE METODOS
// Podemos combinar diferentes métodos para operaciones más complejas
const resultado = productos
    .filter(p => p.precio > 50) // Primero filtramos productos caros
    .map(p => p.nombre) // Luego obtenemos solo los nombres
    .sort() // Ordenamos alfabéticamente
    .reverse(); // Invertimos el orden

console.log('resultado: ', resultado);    