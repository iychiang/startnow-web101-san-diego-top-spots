$(document).ready(function () {
    $.getJSON("data.json", function(data) {
            $.each(data, function(key, object){
                var link = "https://www.google.com/maps/place/" + object.location + "'>Open in Google Maps</a>";

                $("table").append("<tr><td>" + object.name + "</td>" + "<td>" + object.description + "</td>" + "<td>" + "<a href='" + link + "</td></tr>");
                
                
            });
        });
    });

    function initMap() {
        var myLatLng = {lat: 32, lng: -117};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: myLatLng
        });
        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map
        });
      }