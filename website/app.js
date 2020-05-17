/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?'
let apiKey = 'd594a0c387b67e5f659bdb39f592b78d'


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Main function in chained promises
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
 // e.preventDefault();
 let zipCode = document.getElementById('zip').value;
let content = document.getElementById('feelings').value;
console.log(zipCode, content)
  getWeather(baseURL , zipCode , apiKey)
    .then(function (userData) {
      postData('/add', {
        date: newDate, temp: userData.main.temp, content: content
      }).then(function (newData) {
        updateUI()
      })
    }
    )}

/* Defining functions in the chained promises */

// Fetch API weather data
const getWeather = async (baseURL , zipCode , apiKey) => {
  const res = await fetch(`${baseURL}zip=${zipCode},us&appid=${apiKey}`)
  try {
    const data = await res.json();
    console.log('data ',data);

    return data;
    }catch(error) {
      console.log("error", error)
  }
}

// Store fetched API data to endpoint
const postData = async (url = '', data = {})=>{
  const response=await fetch(url,{
    method:'POST',
    credentials:'same-origin',
    headers:{
        'Content-Type':'application/json',
    },
    body:JSON.stringify(data),
});
try{
    const newData=await response.json();
    console.log(newData);
    return newData;
}
catch(error)
{
    console.log(error);
}
}

// Update UI
const updateUI = async() => {
  const request = await fetch('/all')
  try{
    const allData = await request.json()
    console.log('allData ', allData);
  document.getElementById('date').innerHTML = allData[0].date;
  document.getElementById('temp').innerHTML = allData[0].temp;
  document.getElementById('content').innerHTML = allData[0].content;
  }catch(error){
    console.log("error", error)
  }
}
