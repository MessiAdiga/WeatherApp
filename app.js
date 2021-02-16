const express = require("express");
const https = require("https");
const bodyParser = require("body-parser"); //to parse POST data from user input
const app = express();
app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){

  const query = req.body.cityName;
  const apiKey = "your_token";
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temperature = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const iconCode = weatherData.weather[0].icon;
      const iconUrl = "http://openweathermap.org/img/wn/"+iconCode+"@2x.png"

      res.write("<h1>The temperature in "+query+" is "+temperature+" degrees Celcius</h1>");
      res.write("<h2>The weather is : "+description+".</h2>");
      res.write("<img src="+iconUrl+">");

      res.send();
    });
  });
});



app.listen(3000, function(){
  console.log("Server started on port 3000");
});
