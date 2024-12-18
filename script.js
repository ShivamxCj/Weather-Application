document.addEventListener("DOMContentLoaded", ()=>{
    // --grabing all the HTML elements-----------
    const city_input= document.getElementById("city-input")
    const get_weather_btn= document.getElementById("get-weather-btn")
    const weather_info= document.getElementById("weather-info")
    const city_name= document.getElementById("city-name")
    const temperature= document.getElementById("temperature")
    const description= document.getElementById("description")
    const error_msg= document.getElementById("error-message")
    //api form 'openweathermap' 
    const API_key= "5e6adc6ba5af9f30dab91e9e0b520e06" // env variable
    //-----------------------------------------------

    get_weather_btn.addEventListener("click",async ()=>{
        const city_name= city_input.value.trim()
        if(!city_name){
            return
        }
        // every web request or request from database takes time 
        // it may resolve or may reject
        // always use async and await in these cases

        try {
            const weatherData= await fetchWeatherData(city_name)
            displayWeatherData(weatherData)
        } catch (error) {
            throwError()
        }
    })

    async function fetchWeatherData(city){
        // fetches weather data
        const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}`

        const response= await fetch(url)
        console.log(typeof response)
        console.log(response)
        if(!response.ok){
            throw new Error("No city found!")
        }
        const data= await response.json()
        return data
    }

    function displayWeatherData(cityData){
        console.log(cityData, typeof cityData)     
        const {name,main,weather,}= cityData   
        
        weather_info.classList.remove("hidden")
        error_msg.classList.add("hidden")

        city_name.textContent= name
        temperature.textContent= `Temperature: ${main.temp}\u00B0 c`
        description.textContent= `Description: ${weather[0].description}`
        }

    function throwError(){
        // throws error on invalid input
        error_msg.classList.remove("hidden")
        weather_info.classList.add("hidden")
    }
})