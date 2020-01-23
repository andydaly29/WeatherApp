//get longitude and latitude from my location

window.addEventListener('load', function () {
    var long;
    var lat;
  
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        
        const proxy = `https://cors-anywhere.herokuapp.com/`;
        const apiPage = `${proxy}https://api.darksky.net/forecast/a07402a12b7f64a1ff34879ba3698903/${lat},${long}`

        fetch(apiPage)
        .then(response =>{
            return response.json();
        })
        .then(data =>{
            console.log(data);
            const {temperature, summary} = data.currently;
        })
      });
    } 
    else {
      console.log('not working');
    }
  });