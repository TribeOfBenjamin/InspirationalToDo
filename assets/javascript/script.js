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
                // This is logging the name of the city 
                var city = response.name;
                $("#city").html(city);
                //This is the temperature 
                var tempC = (response.main.temp)
                var convTemp = tempConvert(tempC);
                console.log(convTemp);
                $("#weather").html(convTemp + "°F");

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
    var todoArr = [];
    var todoListObj = {
      todoTask: "",
      done: "",
    };

    $("#input").keypress(function (event) {
      if (event.keyCode === 13) {
          event.preventDefault();
          
          var todoList = JSON.parse(localStorage.getItem("todoList"));
          var todo = $("#input").val();
          if (todo !== "") {
              if (todoList === null) {
                  todoListObj.todoTask = todo;
                  todoListObj.done = false;
                  todoArr.push(todoListObj);
                  localStorage.setItem("todoList", JSON.stringify(todoArr));
              } else {
                  let todoIndex = todoList.findIndex((List) => List.done === true);
                  if (todoIndex !== -1) {
                      todoList[todoIndex].todoTask = todo; 
                  } else {
                      todoListObj.todoTask = todo;
                      todoListObj.done = false;
                      todoList.push(todoListObj);
                  }
                  localStorage.setItem("todoList", JSON.stringify(todoList));
              }
          }
           renderTodo();    
        } 
             
        
      
    });

    $("ul").on("click", "li", function () {
        $(this).toggleClass("done");
    });

    $("ul").on("click", "span", function (e) {
        e.stopPropagation();
        $(this).parent().fadeOut();
    });

    function renderTodo() {
        let storedTodo = JSON.parse(localStorage.getItem("todoList"));
        if (storedTodo !== null) {
            // $("#input").empty();
            for (let i = 0; i < storedTodo.length; i++){
                var listEl = $('<li><span><i class="fa fa-trash-alt" aria-hidden="true"></i></span> ' + storedTodo[i] + "</li>");
                $("#list").append(listEl);

                $("#input").val("");
            }
        }

    }

});
