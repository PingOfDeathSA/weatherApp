// here im requreing my express modules 


const express =  require("express");
const bodyPaser = require("body-parser")
const { STATUS_CODES, request } = require("http");
const { Console } = require("console");
const https = require("https");
// below i'm initilizing a new express app
const app =  express();

// to start to passing body-request
app.use(bodyPaser.urlencoded({extended: true}))




app.get( "/",function (req, res) {

    res.sendFile(__dirname+"/weather.html")
  
} );

app.post("/", function (req, res) {



  console.log(req.body.CityName);


  // function checkValue(query) {
  //   if (query.includes(value)) {
  //    return valu
  //   } else {
  //     return "Name of found"
  //   }
  // }
  
const query = req.body.CityName;
const apikey = "46bc6752c8f9a311ca8499fbe506a46d";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
  https.get(url, function (response) {
  console.log(response);
     response.on("data", function (data) {
       const weatherData = JSON.parse(data)
       // console.log(weatherData)
         const temp = weatherData.main.temp
         const humi = weatherData.main.humidity
         const cityName = weatherData.name
         const description = weatherData.weather[0].description
         const iconimage = weatherData.weather[0].icon
         const  imageUrl = "https://openweathermap.org/img/wn/"+iconimage+"@2x.png";

        //  console.log("humidity is "+humi)
        //  console.log("city Name is "+query)
        //  console.log("weather Status is "+ description)
        //  console.log("Temperature is "+temp)
          

          res.write( "<p> weather is currently "+ description+"<p> ");
           res.write( "<h1> The temperature in "+query+ " is "+ temp +" degrees Celcius </h1>");
           res.write("<img src='" + imageUrl + "'>");
           
         res.send();
     })
     
 });

  
});


app.listen(process.env.PORT ||3000,  function () {
   console.log("sever is runing on port 3000")
    
})

// const https = require('node:https');

// https.get('https://encrypted.google.com/', (res) => {
//   console.log('statusCode:', res.statusCode);
//   console.log('headers:', res.headers);

//   res.on('data', (d) => {
//     process.stdout.write(d);
//   });

// }).on('error', (e) => {
//   console.error(e);
// });