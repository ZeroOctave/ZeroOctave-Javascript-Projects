window.addEventListener("load", () => {

    let long;
    let lat;

    let classdescription = document.querySelector('.class-description')
    let temperaturedegree = document.querySelector('.temperature-degree')
    let locationtimezone = document.querySelector('.location-timezone')

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/"
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {

                    const { temperature, summary, icon } = data.currently;

                    temperaturedegree.textContent = temperature;
                    classdescription.textContent = summary;
                    locationtimezone.textContent = data.timezone

                    seticon(icon, document.querySelector(".icon"))

                });

        });

    };

    function seticon(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon])
    }

});
