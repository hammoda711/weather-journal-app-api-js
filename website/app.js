// Global Variables 

let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = 'ec16a42283fffe3bbe05d2c7fc7307fa&units=metric';

const generateEl = document.getElementById('generate');

//add event
generateEl.addEventListener('click', performAction);


function performAction(e) {
    const newZip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    

    if(newZip.trim("")==""||feelings.trim("")==""){
        alert("not valid")
    };
    

    //chaining
    getWeatherData(baseURL, newZip, apiKey).then(function(data) {
        console.log(data);
        //add data to post request
        postData('/add', { date: newDate, temp: data.main.temp, content: feelings });
        //call function that GET the project data  
        retrieveData();
    });
};



//GET web API
const getWeatherData = async (baseURL, zip, key) => {

    const res = await fetch(baseURL+zip+key);

    try {
        const data = await res.json();
        console.log(data);
        return data;
    }

    catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}



//POST all data
const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData
    }
    catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}



// GET project data
const retrieveData = async () => {
    const request = await fetch('/all');
    try {
        // Transform into JSON
        const allData = await request.json()
        console.log(allData)

        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = Math.round(allData.temp) + 'degrees';
        document.getElementById('content').innerHTML = allData.content;
        document.getElementById("date").innerHTML = allData.date;
    }
    catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
};














