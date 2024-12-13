// types.ts

// Interfaz principal para los datos del clima
export interface WeatherData {
    location: Location;
    current: CurrentWeather;
    forecast: Forecast[];
}

// Interfaz para la información de ubicación
export interface Location {
    city: string;
    country: string;
    lat: number;
    lon: number;
}

// Interfaz para el clima actual
export interface CurrentWeather {
    temp: number; // Temperatura en Celsius
    humidity: number; // Humedad en porcentaje
    windSpeed: number; // Velocidad del viento en km/h
    condition: string; // Descripción del clima (ej: "Soleado", "Lluvioso"...)
    icon: string; // URL del ícono del clima
}

// Intefaz para el pronóstico
export interface Forecast {
    date: string; // Fecha del pronóstico
    maxTemp: number; // Temperatura máxima
    minTemp: number; // Temperatura mínima
    condition: string; // Condición del clima
    icon: string; // URL del ícono
}

// Tipo para las unidades de temperatura
export type TemperatureUnit = 'celsius' | 'fahrenheit';