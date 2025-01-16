// Helper function to get current position
const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
    } else {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }
  });
};

export async function fetchWeather() {
  try {
    // Get current location
    let position;
    try {
      position = await getCurrentPosition();
    } catch (error) {
      console.warn('Failed to get location:', error);
      return {
        temperature: "N/A",
        condition: "Weather not available",
        icon: "clear" // fallback icon
      };
    }

    const today = new Date().toISOString().split('T')[0];
    const response = await fetch(
      `https://api.brightsky.dev/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&date=${today}`
    );
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
    return {
      temperature: "N/A",
      condition: "Weather not available",
      icon: "clear" // fallback icon
    };
  }
}
