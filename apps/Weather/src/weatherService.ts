// Servicio del Clima
// Primero se importan los módulos a utilizar
import { WeatherData, Location } from "./types";

export class WeatherService {
    private readonly API_KEY = '42972e63063549d4aea05648240512';
    private readonly BASE_URL = 'https://api.weatherapi.com/v1';

    // Métedo para obtener los datos del clima por ciudad
    public async getWeatherByCity(city: string): Promise<WeatherData> {
        try {
            // Realizamos la petición a la API
            const response = await fetch(`${this.BASE_URL}/forecast.json?key=${this.API_KEY}&q=${city}&days=7`);

            if(!response.ok){
                throw new Error('Error al obtener datos del clima');
            }

            const data = await response.json();

            // Transformamos la respuesta al formato de nuestra aplicación
            return this.tranformApiResponse(data);

        } catch (error) {
            console.error('Error en WeatherService: ', error);
            throw error;
        }
    }

    // Método privado para transformar la respuesta de la API a nuestro formato
    private tranformApiResponse(apiData: any): WeatherData {
        return {
            location: {
                city: apiData.location.name,
                country: apiData.location.country,
                lat: apiData.location.lat,
                lon: apiData.location.lon,
            },
            current: {
                temp: apiData.current.temp_c,
                humidity: apiData.current.humidity,
                windSpeed: apiData.current.wind_kph,
                condition: apiData.current.condition.text,
                icon: `${apiData.current.condition.icon}`
            },
            forecast: apiData.forecast.forecastday.map((day: any)=>({
                date: day.date,
                maxTemp: day.day.maxtemp_c,
                minTemp: day.day.mintemp_c,
                condition: day.day.condition.text,
                icon: `${day.day.condition.icon}`
            }))
        };
    }
}