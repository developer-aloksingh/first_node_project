const express = require('express');
const app = express();

//node can't stand json data so below code is use to convert data from JSON to object
var bodyParser = require('body-parser');
app.use(bodyParser.json());
 
//conect with database
const db = require('./db');

//dotenv file
//require('dotenv').config();


let port = process.env.PORT || 3000;


//middleware
const logRequest = (req, res, next) => {
  console.log(`middleware executed`);
  next();
}
app.use(logRequest);


//  //GET-send reponse to user and middleware
//  app.get('/', logRequest, function(req, res){
//   res.send("welcome to home page")
// })


//import personRoues and middleware
// const personRoutes = require('./routes/personRoutes');
// app.use('/person', logRequest, personRoutes);



app.get('/', function(req, res){
  res.send("welcome to home page")
 })






//import personRoues
 const personRoutes = require('./routes/personRoutes');
 app.use('/person', personRoutes);





// app.listen(3000)  
app.listen(port, () =>{
  console.log(`app is listening on port ${port}`);
});