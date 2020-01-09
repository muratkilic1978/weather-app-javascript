window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let humidityDegree = document.querySelector('.humidity-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
           //console.log(position); 
          long = position.coords.longitude;
          lat = position.coords.latitude;
          
          const proxy = "https://cors-anywhere.herokuapp.com/";    
          const api = `${proxy}https://api.darksky.net/forecast/2d19e0cc32716be61e17f07ce1b58c41/${lat},${long}`;
            
            fetch(api)
                .then(response =>{
                    return response.json();  
                })
                .then(data =>{
                    console.log(data);
                    const {temperature, summary, icon, windspeed, humidity} = data.currently;
                   
                    // Set DOM ELements from the api darksky.net
                    let celciusTemperature = ((temperature - 32) * 5)/9;
                    temperatureDegree.textContent = celciusTemperature.toFixed(1);
                    temperatureDescription.textContent = summary;
                    humidityDegree.textContent = humidity;
                    locationTimezone.textContent = data.timezone;
                    // Set Icon here
                    setIcons(icon, document.querySelector('.icon'));
                });
        }); 
    }
    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
        
    }
});