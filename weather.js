import readline from 'readline/promises';

const API_Key = '';
const BASE_url = 'https://api.openweathermap.org/data/2.5/weather';

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

const getWeather = async(city)=>{
  const url = `${BASE_url}?q=${city}&appid=${API_Key}&units=metric`;

  try{
    const response = await fetch(url);
     if(!response.ok){
        throw new Error("City not found!!! Please check the city name "); 
     }
     const weatherData = await response.json();

     console.log('\n weather Information');
     console.log(`city:${weatherData.name}`);
     console.log(`Temperature:${weatherData.main.temp}`);
     console.log(`Description:${weatherData.weather[0].description}`);
  }
  catch(error){
    console.log(error);
  }
}

const city = await rl.question("Enter a city name to get its weather:");
await getWeather(city);
rl.close();