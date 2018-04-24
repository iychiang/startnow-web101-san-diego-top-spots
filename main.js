$(document).ready(function () {
    $.getJSON("data.json", function (data) {
        $.each(data, function (key, object) {
            var link = "https://www.google.com/maps/dir/Current+Location/" + object.location + "'>Open in Google Maps</a>";
            $("table").append("<tr><td>" + object.name + "</td>" + "<td>" + object.description + "</td>" + "<td>" + "<a href='" + link + "</td></tr>");
        });
    });
});

function initMap() {
    let zoom = { lat: 32.767874, lng: -117.166531 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        center: zoom
    });

    $.getJSON("data.json", function (data) {
        var visibleInfoWindow;

        $.each(data, function (key, object) {
            var myLatLng = { lat: object.location[0], lng: object.location[1] }
            console.log(myLatLng);

            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: object.name
            });

            var contentString = '<h4>' + object.name + '</h4>' + '<p>' + object.description + '</p>';

            var infoWindow = new google.maps.InfoWindow({
                content: contentString
            });

            var prevWindow = false;

            marker.addListener('click', function () {
                if (visibleInfoWindow){ //assign variable that is falsy on purpose so doesn't hit if statement
                    visibleInfoWindow.close(); //will be relevant second time function loops
                    visibleInfoWindow = null; //refresh so click won't store a value
                }
                visibleInfoWindow = infoWindow;  

                infoWindow.open(map, marker);
                if (prevWindow == false) {
                    infoWindow.open(map, marker);
                    prevWindow = true;
                    count++;
                } else {
                    infoWindow.close();
                    prevWindow = false;
                }
            });

        });
    });
}