function initMap(){
    var options = {
        zoom:8,
        center:{lat:29.3909,lng:-76.9635}
    }

    var map = new google.maps.Map(document.getElementById('map'),options);
}