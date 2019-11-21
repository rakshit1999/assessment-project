var lat;
var lng;
var city;

$('#btn').click(function () {
    lat = 0;
    lng = 0;
    city = document.getElementById("city-name").value;
    //weather api
    $.getJSON("https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&APPID=8e4dfa289871334662836ee6616527d4",
        function (data) {
            $('.temp').empty();
            $('.weather').empty();
            var icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
            var temp = data.main.temp;
            var weather = data.weather[0].main;
            $(".icon").attr("src", icon);
            $('.temp').append(temp + "&#8451;");
            $('.weather').append(weather);
        }
    );

    // geocode api
    $.getJSON("https://cors-anywhere.herokuapp.com/http://open.mapquestapi.com/geocoding/v1/address?key=nQm9XprUAmoXluOdCqAj7UiNOAY3M2ld&location=" + city,
        function (response) {
            // console.log(response);
            lat = response.results[0].locations[0].latLng.lat;
            lng = response.results[0].locations[0].latLng.lng;
            // console.log(lat);
            // console.log(lng);
        }
    );

    $('#mapbtn').show();
    $('#weatherheading').show();
});

$('#mapbtn').click(function () {
    $('#aqiheading').show();
    $('#mapHeading').show();

    // To make map....
    //map options
    var options = {
        zoom: 8,
        center: { lat: lat, lng: lng }
    }
    //map
    var map = new google.maps.Map(document.getElementById('map'), options);
    //add marker
    var marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map
    });

    // air quality index api
    $.getJSON("https://cors-anywhere.herokuapp.com/http://api.airpollutionapi.com/1.0/aqi?lat=" + lat + "&lon=" + lng + "&APPID=uv6i6vofpbscsmlsjpmvek1bq",
        function (res) {
            $('#aqialert').empty();
            $('#aqipara').empty();
            $('#aqiparameter').empty();
            $('#aqireport').empty();
            // console.log(res);
            var aqialert = res.data.alert;

            res.data.aqiParams.forEach(func);
            function func(item) {
                if (item.name == "PM2.5") {
                    var aqi = item.aqi;
                    var aqiparameter = item.name;
                    var aqireport = item.text;

                    $('#aqialert').append(aqialert);
                    $('#aqipara').append("Air Quality Index(AQI): " + aqi);
                    $('#aqiparameter').append("Pollutant: " + aqiparameter);
                    $('#aqireport').append("Category: " + aqireport);
                }
            }
        }
    );
})

