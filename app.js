const express = require("express"); // requiring express module
const { STATUS_CODES } = require("http");
const app = express(); //initializing new express app
const https = require("https");
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended: true})); //this code is used to start parsing through the body of the post request

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html"); //code for sending html file to browser
});

app.post("/", function(req,res) {

    //console.log("Post request received"); //On getting succesfull response from user on the req
    //console.log(req.body.cityname); //to receive data from post request

    const city = req.body.cityname;
    const apikey = "12e38a48df444d00f503a9e6dee517fc";
    const units = "metric";
const url= "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=" + apikey + "&units=" + units; //getting live data using openwaether API
https.get(url, function(response) //making https request to get data
{
    console.log(response.statusCode);

    response.on("data", function(data) //hold of the data from the response
    {
        const weatherdata = JSON.parse(data) //javascript object parse will turn into string format(JSON.stringify does opposite){parsing data into actual js object}
        console.log(weatherdata);
        const temp = weatherdata.main.temp   //getting temp value from main
        console.log(temp); //printing value on gitbash
        console.log(weatherdata.weather[0].description); //finding decription value from weather(array)
        
        //below code for how to put an image icon 
        const icon = weatherdata.weather[0].icon
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

        res.write("<h1>The temperature of "+ req.body.cityname + " is "+temp+" degree Celcius</h1>"); //res.write for displaying on the local host or window
        res.write("<p>Weather is currently "+ weatherdata.weather[0].description + "<p>");
        res.write("<img src=" + imageURL +">");
        res.send(); //res.send can be used only one time

    })
})
})




app.listen(3000, function() {
   console.log("Server is running on port 3000");  
})


//Body parser: to install npm i body-parser(it is a package that allows us to look through the body of the post request and fetch the data based on the name of our input)