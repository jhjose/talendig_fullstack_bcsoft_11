// API datos locales de los planetas
const planetsData = [
	{
		name: "Mercurio",
		gravity: 3.7,
		radius: 2439.7,
		temperature: 167,
		distanceFromSun: 57.9,
		color: '#808080',
		description: "El planeta más pequeño y más cercano al Sol."
	},
	{
		name: "Venus",
		gravity: 8.87,
		radius: 6051.8,
		temperature: 464,
		distanceFromSun: 108.2,
		color: '#e6b800',
		description: "El planeta más caliente del sistema solar."
	},
	{
		name: "Tierra",
		gravity: 9.81,
		radius: 6371,
		temperature: 15,
		distanceFromSun: 149.6,
		color: '#4ca6ff',
		description: "Nuestro hogar, el único planeta conocido con vida."
	},
	{
		name: "Marte",
		gravity: 3.71,
		radius: 3389.5,
		temperature: -63,
		distanceFromSun: 227.9,
		color: '#ff4c4c',
		description: "El planeta rojo, objetivo de futuras misiones humanas para destruirlo también."
	},
	{
		name: "Júpiter",
		gravity: 24.79,
		radius: 69911,
		temperature: -110,
		distanceFromSun: 778.5,
		color: '#ffb366',
		description: "El planeta más grande del sistema solar."
	},
	{
		name: "Saturno",
		gravity: 10.44,
		radius: 58232,
		temperature: -140,
		distanceFromSun: 1434,
		color: '#fff5cc',
		description: "Famoso por sus espectaculares anillos."
	},
	{
		name: "Urano",
		gravity: 8.69,
		radius: 25362,
		temperature: -195,
		distanceFromSun: 2871,
		color: '#99ffff',
		description: "El planeta que gira sobre su lado."
	},
	{
		name: "Neptuno",
		gravity: 11.15,
		radius: 24622,
		temperature: -200,
		distanceFromSun: 4495,
		color: '#3333ff',
		description: "El planeta más ventoso del sistema solar."
	},
];

// Función flecha para crear botones de planetas
const createPlanetButtons = ()=>{
	const buttonContainer = document.getElementById('planetButtons');
	
	planetsData.forEach(planet => {
		const button = document.createElement('button');
		button.textContent = planet.name;
		button.className = 'planet-button';
		button.onclick = () => showPlanetInfo(planet);
		buttonContainer.appendChild(button);
	});
}

// Función para formatear números grandes
function formatNumber(num){
	return new Intl.NumberFormat('es-ES').format(num);
}

// Función para mostrar la información del planeta
function showPlanetInfo(planet){
	const infoDiv = document.getElementById('planetInfo');
	infoDiv.className = ''; // Reset animation
	void infoDiv.offsetWidth; // Forzar reflow
	
	// Crear el contenido HTML con una estructura de tarjeta
	const planetHTML = `
		<div class="planet-card">
			<div class="planet-circle" style="background: ${planet.color}">
				${planet.name === "Saturno" ? "<div class='saturn-rings'></div>" : ''}
			</div>
			<h2>${planet.name}</h2>
			<p>${planet.description}</p>
			<div class="planet-stats">
				<div class="stat-item">
					<strong>Gravedad</strong>
					<p>${planet.gravity}</p>
				</div>
				<div class="stat-item">
					<strong>Radio</strong>
					<p>${formatNumber(planet.radius)}</p>
				</div>
				<div class="stat-item">
					<strong>Temperatura</strong>
					<p>${planet.temperature}</p>
				</div>
				<div class="stat-item">
					<strong>Distancia del Sol</strong>
					<p>${formatNumber(planet.distanceFromSun)}</p>
				</div>
			</div>
		</div>
	`;
	
	infoDiv.innerHTML = planetHTML;
	infoDiv.className = 'visible';
}

// Función autoinvocada para inicializar la aplicación
(function initApp(){
	createPlanetButtons();
})();