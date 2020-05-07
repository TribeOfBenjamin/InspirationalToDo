$(document).ready(function () {

    function kanyeQuoteDisplay() {

        var queryURL = "https://api.kanye.rest";

        $.ajax({
        url: queryURL,
        method: "GET"
        })
        .then(function(response) {
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
















});
