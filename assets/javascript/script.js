$(document).ready(function () {

    // Kanye Quote API
    function kanyeQuoteDisplay() {

        var queryURL = "https://api.kanye.rest";

        $.ajax({
        url: queryURL,
        method: "GET"
        })
        .then(function(response) {

            // Creates paragraph with quote and appends to div
            let kanyeQuote = $("<p>").text(response.quote);

            $("#kanyeQuote").append(kanyeQuote);

        });
    };

    kanyeQuoteDisplay();

    // Clock using moment.js
    function updateClock() {
    
        $("#date").text(moment().format("LTS"));
    }

    setInterval(updateClock, 1000);

    function USHolidaysDisplay() {

        let APIKey = "29671703895b844822f5b4b4b459925e35ceadde"
        
        var queryURL = "https://calendarific.com/api/v2/holidays?&api_key=" + APIKey + "&country=US&year=2020";

        $.ajax({
        url: queryURL,
        method: "GET"
        })
        .then(function(result) {
            
            // Hard coded with [1] for now. Will want to find a way to check the date and serve up that holiday
            let holidayName = result.response.holidays[1].name;

            let holidayToday = $("<p>").text(holidayName);

            $("#holidayToday").append(holidayToday);

            console.log(holidayName);
        });



    }

    USHolidaysDisplay();

    

    // Function for the weather and current city
    $("#searchBtn").on("click", function (event) {
        event.preventDefault();
    
    // We will be using a zipcode call to get their location 
    // Through this call we can get the location name appended to page 
    var zipcode = $("#searchInput").val();
    console.log(zipcode);
    queryURL = "http://api.openweathermap.org/data/2.5/weather?zip=" +
        zipcode + ",us&appid=84195ee828661450717285da2a13ecae"
    
    
    $.ajax({
    
        url: queryURL,
        method: "GET"
    })
    
        .then(function (response) {
            // This is logging the name of the city 
            console.log(response.name);
            var city = response.name;
            $("#city").html(city);
            //This is the temperature 
            var tempC = (response.main.temp)       
            var convTemp = tempConvert(tempC);
            console.log(convTemp);
            $("#weather").html(convTemp + "°F");
    
        });
    
    
    });
    
    // This function converts temperature to farenheight
    function tempConvert(valNum) {
        var celsius = valNum - 273.15;
        var faren = Math.floor(celsius * (9 / 5) + 32);
        console.log("the temperature is " + faren + "degrees farenheight");
        console.log(valNum + "this is val num");
        valNum = parseFloat(valNum);
    
        return (faren);
    
    }
    
    
    
















});
