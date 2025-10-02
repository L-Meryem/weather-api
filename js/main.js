//[https://geocode.maps.co/docs] takes city and country
    // returns latitude and longitude that are used by a weather api [https://www.weatherapi.com/]


document.querySelector('button').addEventListener('click', addressToCoordinates);

function addressToCoordinates() {
    const city = document.querySelector('#city').value;
    const country = document.querySelector('#country').value;


    const geoKey = 'c10413ffc4334951aa9225330250110';
    const geoUrl = `https://geocode.maps.co/search?city=${city}&country=${country}`;

    fetch(geoUrl)
        .then(res => res.json())
        .then(data => {
            const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${geoKey}&q=${data[0].lat},${data[0].lon}`;
            // console.log(data);
            return fetch(weatherUrl);
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            document.querySelector('#temperature').innerText = `The temperature is ${data.current.temp_f}°F in ${data.location.name}, ${data.location.country}`;
            // console.log(data.current.temp_f);
        })
        .catch(error => {
            console.log(error);
        });

}