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
  var newDate = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
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

            let holidayToday = $("<p>").text("Today is " + holidayName);

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
    queryURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=84195ee828661450717285da2a13ecae";

    $.ajax({
      url: queryURL,
      method: "GET",
    })
      .then(function (response) {

        // this is grabbing the icon for the weather
        var imgSource = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png"
        // This is logging the name of the city
        console.log(response);
        console.log(response.weather[0].icon);        
        var city = response.name;
        $("#city").html(city);
        //This is the temperature
        var tempC = response.main.temp;
        var convTemp = tempConvert(tempC);
        console.log(convTemp);
        $("#weather").html(convTemp + "°F");
         //appending the icon image onto the html
         $("#imgIcon").attr('src', imgSource);
      });
  }

  // This function converts temperature to farenheight
  function tempConvert(valNum) {
    var celsius = valNum - 273.15;
    var faren = Math.floor(celsius * (9 / 5) + 32);
    console.log("the temperature is " + faren + "degrees farenheight");
    console.log(valNum + "this is val num");
    valNum = parseFloat(valNum);

    return faren;
  }

  // To-Do script functions

  $(".fa-caret-down").on("click", function () {

    $("#input").slideToggle("slow");
    $("#input").focus();
    renderTodo();

  });
  //creating objects to store in local-storage
  var todoListObj = {
    todoTask: "",
    isDone: false,
  };

  $("#input").keypress(function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();

      let todoLists = JSON.parse(localStorage.getItem("todoList"));
      var todo = $("#input").val();
      if (todo !== "") {
        if (todoLists === null) {
          todoListObj.todoTask = todo;
          localStorage.setItem("todoList", JSON.stringify([todoListObj]));
        } else {
          todoListObj.todoTask = todo;
          todoLists.push(todoListObj);
          localStorage.setItem("todoList", JSON.stringify(todoLists));
        }
      }
      renderTodo();
    }
  });

  $("ul").on("click", "li", function () {
    // $(this).toggleClass("done");
    let currentTask = $(this).parent().text().trim();
    console.log("currentTask: ", currentTask);
    // let todoLists = JSON.parse(localStorage.getItem("todoList"));

    // let getIndex = todoLists
    //   .map(function (todoObject) {
    //     return todoObject.todoTask;
    //   })
    //   .indexOf(currentTask);

    // if (todoLists[getIndex].isDone === false) {
    //   todoLists[getIndex].isDone = true;
    // } else {
    //   todoLists[getIndex].isDone = false;
    // }
    // localStorage.setItem("todoList", JSON.stringify(todoLists));
  });

  $("ul").on("click", "span", function (e) {
    e.stopPropagation();
    let taskToRemove = $(this).parent().text().trim();
    let todoLists = JSON.parse(localStorage.getItem("todoList"));

    let removeIndex = todoLists
      .map(function (todoObject) {
        return todoObject.todoTask;
      })
      .indexOf(taskToRemove);

    todoLists.splice(removeIndex, 1);
    localStorage.setItem("todoList", JSON.stringify(todoLists));
    $(this).parent().remove();

  });

  $("ul").on("mouseenter", "#trash", function () {
    $(this).css("fontSize", "25px");
  });
  $("ul").on("mouseleave", "#trash", function () {
    $(this).css("fontSize", "15px");
  });

  function renderTodo() {
    let storedTodo = JSON.parse(localStorage.getItem("todoList"));
    if (storedTodo !== null) {
      $("#list").empty();
      for (let i = 0; i < storedTodo.length; i++) {
        var listEl = $('<li><span><i class="fa fa-trash-alt" id="trash" aria-hidden="true"></i></span> ' + storedTodo[i].todoTask + '<input class = "completeItem" type = "checkbox">' + "</li>");
        $("#list").append(listEl);
        $("#input").val("");
      }
    }
  }


});
