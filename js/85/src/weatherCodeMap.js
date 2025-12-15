// weatherMap.js

/**
 * WMO_TO_ICON_MAP maps the WMO Weather Interpretation Codes (0-99)
 * to the corresponding OpenWeatherMap (OWM) icon codes (without the day/night suffix 'd' or 'n').
 * We use the most visually appropriate OWM icon for each WMO event.
 */
const WMO_TO_ICON_MAP = {
    // 0-3: Cloud coverage
    0: '01', // Clear sky
    1: '02', // Mainly clear
    2: '03', // Partly cloudy
    3: '04', // Overcast

    // 45-48: Fog and depositing Rime Fog
    45: '50', // Fog
    48: '50', // Depositing Rime Fog (Icy Fog)

    // 51-57: Drizzle
    51: '09', // Light Drizzle
    53: '09', // Moderate Drizzle
    55: '09', // Dense Drizzle
    56: '09', // Light Freezing Drizzle
    57: '09', // Dense Freezing Drizzle

    // 61-67: Rain
    61: '10', // Slight Rain
    63: '10', // Moderate Rain
    65: '10', // Heavy Rain
    66: '09', // Light Freezing Rain
    67: '09', // Heavy Freezing Rain

    // 71-75: Snow fall
    71: '13', // Slight Snow Fall
    73: '13', // Moderate Snow Fall
    75: '13', // Heavy Snow Fall
    77: '13', // Snow Grains

    // 80-82: Rain showers
    80: '09', // Slight Rain Showers
    81: '09', // Moderate Rain Showers
    82: '09', // Violent Rain Showers

    // 85-86: Snow showers
    85: '13', // Slight Snow Showers
    86: '13', // Heavy Snow Showers

    // 95-99: Thunderstorm events
    // Note: OWM uses '11' for Thunderstorms
    95: '11', // Thunderstorm: Slight or Moderate
    96: '11', // Thunderstorm with Slight Hail
    99: '11', // Thunderstorm with Heavy Hail

    // 999: Fallback for codes not explicitly listed (e.g., historical codes, dust/sand storms, etc.)
    999: '04'
};

/**
 * Base URL for the public OpenWeatherMap icons.
 * We use the @2x resolution for better quality.
 */
const ICON_BASE_URL = 'https://openweathermap.org/img/wn/';

export { WMO_TO_ICON_MAP, ICON_BASE_URL };