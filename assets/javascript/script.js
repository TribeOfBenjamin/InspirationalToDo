$(document).ready(function () {
    //geolocation
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        var crd = pos.coords;
        console.log(pos);
        var lat = crd.latitude;
        var lon = crd.longitude;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        weatherDisplay(lat, lon);




    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);


    // The date is being appended w/ this
    var d = new Date();
    var newDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
    $("#new-date").html(newDate);



    // Kanye Quote API
    function kanyeQuoteDisplay() {

        var queryURL = "https://api.kanye.rest";

        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {
                console.log("Kanye Object");
                console.log(response);

                // Creates paragraph with quote and appends to div
                let kanyeQuote = $("<p>").text('"' + response.quote + '"');

                $("#kanyeQuote").append(kanyeQuote);

            });
    };

    kanyeQuoteDisplay();

    // Clock using moment.js
    function updateClock() {

        $("#date").text(moment().format("LTS"));
    }

    setInterval(updateClock, 1000);

    // Holiday Calendar API
    // I used this SO question as a reference: https://stackoverflow.com/questions/8398897/how-to-get-current-date-in-jquery
    // let d = new Date();

    let monthToday = d.getMonth() + 1;
    let dateToday = d.getDate();

    function USHolidaysDisplay() {

        let APIKey = "29671703895b844822f5b4b4b459925e35ceadde"

        var queryURL = "https://calendarific.com/api/v2/holidays?&api_key=" + APIKey + "&country=US&year=2020";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (result) {

                for (let i = 0; i < result.response.holidays.length; i++) {

                    if ((result.response.holidays[i].date.datetime.day === dateToday) && (result.response.holidays[i].date.datetime.month === monthToday)) {

                        let holidayName = result.response.holidays[i].name;

                        let holidayToday = $("<p>").text(holidayName);

                        $("#holidayToday").append(holidayToday);

                        console.log(holidayName);
                    }
                }

                console.log("Holiday Object");
                console.log(result);

            });

    }

    USHolidaysDisplay();



    // Function for the weather and current city
    $("#searchBtn").on("click", weatherDisplay);
    function weatherDisplay(lat, lon) {

        queryURL = "http://api.openweathermap.org/data/2.5/weather?lat=" +
            lat + "&lon=" + lon+ "&appid=84195ee828661450717285da2a13ecae"


        $.ajax({

            url: queryURL,
            method: "GET"
        })

            .then(function (response) {
                var imgSource = "http://openweathermap.org/img/wn/"+ response.weather[0].icon + "@2x.png"
                // This is logging the name of the city 
                console.log(response);
                console.log(response.weather[0].icon);
                var city = response.name;
                $("#city").html(city);
                //This is the temperature 
                var tempC = (response.main.temp)
                var convTemp = tempConvert(tempC);
                $("#weather").html(convTemp + "°F");
                $("#imgIcon").attr('src', imgSource);

            });


    };

    // This function converts temperature to farenheight
    function tempConvert(valNum) {
        var celsius = valNum - 273.15;
        var faren = Math.floor(celsius * (9 / 5) + 32);
        console.log("the temperature is " + faren + "degrees farenheight");
        console.log(valNum + "this is val num");
        valNum = parseFloat(valNum);

        return (faren);

    }


    $(".fa-caret-down").on("click", function () {
        $("input").slideToggle();
    });

    $("#input").keypress(function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            var todo = $("#input").val();
            console.log(todo);
            var listEl = $('<li><span><i class="fa fa-trash-alt" aria-hidden="true"></i></span> ' + todo + "</li>");
            $("#list").append(listEl);

            $("#input").val("");
        }
    });

    $("ul").on("click", "li", function () {
        $(this).toggleClass("done");
    });

    $("ul").on("click", "span", function (e) {
        e.stopPropagation();
        $(this).parent().fadeOut();
    });

});
