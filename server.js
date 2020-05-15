// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies*/
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8080
const server = app.listen(port, listening)
function listening(){
  console.log(`Server running on localhost: ${port}`);
}

// GET route
app.get('/all', sendData);

function sendData (req, res) {
  res.send(projectData);
};

// POST route

const weatherData = [];

app.post('/add', addEntry);

function addEntry(req, res) {
  newEntry = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content,

  /*projectData['date'] = req.body.date;
  projectData['temp'] = req.body.temp;
  projectData['content'] = req.body.content;
  projectData['feelings'] = req.body.feelings;
  res.send(projectData);*/
  }
  weatherData.push(newEntry);
  res.send(weatherData);
}

app.get('/all', getData)
function getData (req, res) {
  res.send(weatherData);
  console.log(weatherData);
}