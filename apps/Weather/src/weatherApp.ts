import { WeatherService } from "./weatherService";
import { WeatherData, TemperatureUnit } from "./types";

export class WeatherApp {
    private weatherService: WeatherService;
    private currentUnit: TemperatureUnit = 'celsius';
    private weatherData: WeatherData | null = null;

    constructor(){
        this.weatherService = new WeatherService();
        this.initializeApp();
    }

    private async initializeApp(): Promise<void> {
        // Inicializamos los event listeners
        this.setupEventListeners();

        // Cargamos los datos para una ciudad por defecto
        await this.searchWeather('Madrid');
    }

    private setupEventListeners(): void {
        // Manejador para el formulario de búsqueda
        const searchForm = document.getElementById('search-form') as HTMLFormElement;
        searchForm?.addEventListener('submit', async (e)=>{
            e.preventDefault();
            const input = document.getElementById('city-input') as HTMLInputElement;
            await this.searchWeather(input.value);
        });

        // Manejador para cambio de unidades
        const unitToggle = document.getElementById('unit-toggle') as HTMLButtonElement;
        unitToggle?.addEventListener('click', ()=>{
            this.toggleTemperatureUnit();
        })
    }

    private async searchWeather(city: string): Promise<void> {
        try {
            // Mostramos un estado de carga
            this.showLoadingState();

            // Obtenemos los datos del clima
            this.weatherData = await this.weatherService.getWeatherByCity(city);

            // Actualizamos la UI
            this.updateUI();

        } catch (error) {
            
        }
    }

    private showLoadingState(): void {
        const mainContainer = document.getElementById('weather-container');

        if(mainContainer){
            mainContainer.innerHTML = '<div class="loading">Cargando...</div>';
        }
    }

    private updateUI(): void {
        if(!this.weatherData) return;

        const mainContainer = document.getElementById('weather-container');

        if(!mainContainer) return;

        // Actualizamos la información actual
        mainContainer.innerHTML = `
            <div class="current-weather">
                <h2>${this.weatherData.location.city}, ${this.weatherData.location.country}</h2>
                <div class="temperature">
                    ${this.formatTemperature(this.weatherData.current.temp)}
                </div>
                <div class="condition">
                    <img src="https:${this.weatherData.current.icon}" alt="${this.weatherData.current.condition}"> 
                    <span>${this.weatherData.current.condition}</span>
                </div>
                <div class="details">
                    <div>Humedad: ${this.weatherData.current.humidity}% </div>
                    <div>Viento: ${this.weatherData.current.windSpeed} km/h </div>
                </div>
            </div>
            <div class="forecast">
                ${this.renderForecast()}
            </div>
        `;
    }

    private renderForecast(): string {
        if(!this.weatherData) return '';

        return this.weatherData.forecast.map(day => `
            <div class="forecast-day">
                <div class="date">${this.formatDate(day.date)}</div>
                <img src="https:${day.icon}" alt="${day.condition}">
                <div class="temp-range">
                    <span>${this.formatTemperature(day.maxTemp)}</span>
                    <span>${this.formatTemperature(day.minTemp)}</span>
                </div>
            </div>
        `).join('');
    }

    private formatTemperature(temp: number): string {
        if(this.currentUnit === 'fahrenheit'){
            temp = (temp * 9/5) + 32;
        }

        return `${Math.round(temp)}°${this.currentUnit === 'celsius' ? 'C' : 'F'}`;
    }

    private formatDate(dateStr: string): string {
        return new Date(dateStr).toLocaleDateString('es-ES', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    }

    private toggleTemperatureUnit(): void {
        this.currentUnit = this.currentUnit === 'celsius' ? 'fahrenheit' : 'celsius';
        this.updateUI();
    }

    private showError(message: string): void {
        const mainContainer = document.getElementById('weather-container');

        if(mainContainer){
            mainContainer.innerHTML = `<div class="error">${message}</div>`;
        }
    }

}