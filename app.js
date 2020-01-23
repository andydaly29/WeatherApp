//get longitude and latitude from my location

window.addEventListener('load', function () {
    var long;
    var lat;

    let temperatureSummary = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSpan = document.querySelector('.temperature-section span');
    

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        
        const proxy = `https://cors-anywhere.herokuapp.com/`;
        const apiPage = `${proxy}https://api.darksky.net/forecast/a07402a12b7f64a1ff34879ba3698903/${lat},${long}?`

        fetch(apiPage)
        .then(response =>{
            return response.json();
        })
        .then(data =>{
            const {temperature, summary, icon} = data.currently;
            const {timezone} = data;

            //set DOM elements from API
            locationTimezone.textContent = timezone;
            temperatureDegree.textContent = temperature;
            temperatureSummary.textContent = summary;

            setIcons(icon, document.querySelector('.icon'))

            //formula for celsius
            let celsius = (temperature - 32) * (5 / 9);

            //change to celsius/farenheit
            temperatureSpan.addEventListener('click', () => {
                if(temperatureSpan.textContent === "F"){
                    temperatureSpan.textContent = "C"
                    temperatureDegree.textContent = Math.floor(celsius);
                }else{
                    temperatureSpan.textContent = "F"
                    temperatureDegree.textContent = temperature;
                }
            })

        })
      });
    } 
    else {
      console.log('not working');
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({"color": "white"});
        //replace - with _ and uppercase
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
  });