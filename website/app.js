/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = ',us&units=metric&APPID=d594a0c387b67e5f659bdb39f592b78d'
const zipCode = document.getElementById('zip').value;
const content = document.getElementById('feelings').value;
let url = baseURL + zipCode + apiKey

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Main function in chained promises
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
 // e.preventDefault();
 
  getWeather(url)
    .then(function (userData) {
      postData('/add', {
        date: newDate, temp: userData.main.temp, content: content
      }).then(function (newData) {
        updateUI()
      })
    form.reset();
    }
    )}

/* Defining functions in the chained promises */

// Fetch API weather data
const getWeather = async (url) => {
  const res = await fetch(url)
  try {
    const data = await res.json();
    console.log(data);

    return data;
    }catch(error) {
      console.log("error", error)
  }
}

// Store fetched API data to endpoint
const postData = async (url = '', data = {})=>{
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    /*headers: {
    /  'Content-Type': 'application/json',
    },*/
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch(error) {
    console.log("error", error)
  }
}

// Update UI
const updateUI = async() => {
  const request = await fetch('/all')
  try{
    const allData = await request.json()
    console.log(allData);
  document.getElementById('date').innerHTML = allData[0].date;
  document.getElementById('temp').innerHTML = allData[0].temp;
  document.getElementById('content').innerHTML = allData[0].content;
  }catch(error){
    console.log("error", error)
  }
}