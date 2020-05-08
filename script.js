
// We will be using a zipcode call to get their location 
// Through this call we can get the location name appended to page 
var zipcode = prompt("What is your zipcode?")
console.log(zipcode);
queryURL = "http://api.openweathermap.org/data/2.5/weather?zip=" +
    zipcode + ",us&appid=84195ee828661450717285da2a13ecae"


$.ajax({

    url: queryURL,
    method: "GET"
})

    .then(function (response) {
        console.log(response,"response and hi");
        // This is logging the name of the city 
        console.log(response.name);
        var city = response.name;
        $("").html(city);
        //This is the temperature 
        console.log(response.main.temp);
        var tempC = (response.main.temp)
        $("").html(tempC);

        var convTemp = tempConvert(tempC);
        console.log(convTemp);

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


