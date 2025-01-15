export async function fetchWeather() {
  try {
    const today = new Date().toISOString().split('T')[0];
    const response = await fetch(`https://api.brightsky.dev/weather?lat=52.5200&lon=13.4050&date=${today}`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
    const currentWeather = data.weather[0];
    
    // Map API weather conditions to our icon conditions
    const mapCondition = (condition) => {
      const conditionMap = {
        clear: 'clear',
        'partly-cloudy': 'partly-cloudy',
        cloudy: 'cloudy',
        rain: 'rain',
        'light-rain': 'rain',
        'heavy-rain': 'rain',
        snow: 'snow',
        thunderstorm: 'thunderstorm',
        fog: 'fog'
      };
      return conditionMap[condition] || 'clear';
    };

    return {
      temperature: Math.round(currentWeather.temperature),
      condition: mapCondition(currentWeather.condition),
      icon: mapCondition(currentWeather.condition)
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}
