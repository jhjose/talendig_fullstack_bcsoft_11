// Fundamentos de HTTP

// Ejemplo de petición con método GET
/*fetch('https://api.ejemplo.com/datos')
	.then(response => response.json())
	.catch(error => console.log('Error: ', error));*/

// Ejemplo de petición con método POST
/*const enviarDatos = async ()=>{
	try{
		const response = await fetch('https://api.ejemplo.com/usarios', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				nombre: 'Feliz Toribio',
				edad: 21
			})
		});

		const dataResult = await response.json();

		return dataResult;
	}catch(error){
		// Validar si el error es de código 404, 500, 403
	}
}	*/

// REST COUNTRIES API
// API para obtener los países
async function obtenerPaisesRestCountries(){
	try{
		// Hacer petición GET a la API
		const response = await fetch('https://restcountries.com/v3.1/all');
		const paises = await response.json();

		// Mapear solo los datos que necesitamos para simplificar.
		return paises.map(pais => ({
			name: pais.name.common,
			officialName: pais.name.official,
			capital: pais.capital ? pais.capital[0] : 'N/A',
			region: pais.region,
			poblacion: pais.population,
			bandera: pais.flags.svg,
			moneda: pais.currencies ? Object.values(pais.currencies)[0].name : 'N/A',
			idiomas: pais.languages ? Object.values(pais.languages) : []
		}));

	}catch(error){
		console.error('Error al obtener países: ', error);
		alert('Ha ocurrido un error inesperado. Estamos trabajando, vuelve más tarde.');
	}
}

obtenerPaisesRestCountries().then(paises => {
	console.log('paises', paises)
});

