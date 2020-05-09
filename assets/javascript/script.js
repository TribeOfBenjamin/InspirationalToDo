$(document).ready(function () {
    
    // The date is being appended w/ this
    var d = new Date();
    var newDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
    $("#new-date").html(newDate);

    // Start this elements hidden
    var hidden = $("#hidden");
    hidden.hide();

    // Kanye Quote API
    function kanyeQuoteDisplay() {

        var queryURL = "https://api.kanye.rest";

        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {
                console.log(response);

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
        .then(function(result) {

            // Hard coded with [1] for now. Will want to find a way to check the date and serve up that holiday
            let holidayName = result.response.holidays[1].name;

            let holidayToday = $("<p>").text(holidayName);

            $("#holidayToday").append(holidayToday);

            console.log(holidayName);
            console.log(result.response)
            console.log(monthToday);
            console.log(dateToday);
        });

    }

    USHolidaysDisplay();



    // Function for the weather and current city
    $("#searchBtn").on("click", function (event) {
        hidden.show();
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
