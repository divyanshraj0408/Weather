window.addEventListener("load", () => {
    let longitude;
    let latitude;
    let temperatureDescription = document.querySelector(
        ".temperature-description"
    );
    let temperatureDegree = document.querySelector(".weather-display-el");
    let locationTimezone = document.querySelector(".area-display-el");
    let locationDiv = document.querySelector(".location");
    let iconEl = document.querySelector(".icon-el");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            const api = `http://api.weatherapi.com/v1/current.json?key=f4fb2a56cd614baa90b115318211105&q=${latitude},${longitude}&aqi=no`;
            fetch(api)
                .then((data) => {
                    return data.json();
                })
                .then((data) => {
                    console.log(data);
                    const { feelslike_c, feelslike_f } = data.current;
                    console.log(feelslike_f);
                    const region = data.location.region;
                    const country = data.location.country;
                    const text = data.current.condition.text;
                    const icon = data.current.condition.icon;
                    const day = data.current.is_day;
                    // Set DOM Element from the API
                    temperatureDegree.textContent = feelslike_c;
                    temperatureDescription.textContent = text;

                    locationDiv.innerHTML = `
                                                <h1 class="area-display-el">${country}/${region}</h1>
                                                    <img src="${icon}" class="icon-el">
                                             `;

                    if (day) {
                        document.body.style.backgroundColor = ` #eec0c6`;
                        document.body.style.backgroundImage = `linear-gradient(315deg, #eec0c6 0%, #e58c8a 74%)`;
                    } else {
                        document.body.style.backgroundColor = `#0cbaba`;
                        document.body.style.backgroundImage = `linear-gradient(315deg, #0cbaba 0%, #380036 74%)`;
                    }
                });
        });
    } else {
        h1.textContent = "Please enable location";
    }
});