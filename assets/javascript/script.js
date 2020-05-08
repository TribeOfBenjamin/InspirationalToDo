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













});
