//Empty JS object to act as endpoint for all routes 
projectData = {};


// Express to run server and routes
const express = require('express');


// Start up an instance of app
const app = express();


// middleware
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


//Initializing the main project folder 
app.use(express.static('website'));

//setup server
const port = 8000;
const server = app.listen(port, listening);

function listening(){
    console.log("server running"); 
    console.log(`server is running on localhost: ${port}`);
}


//add GET route 
app.get('/all', sendData);

function sendData(req, res) { 
    res.send(projectData);
    
    
    };


//add POST route 
app.post('/add', addData )

function addData (req, res){
    console.log(req.body)
    newEntry = { 
        temp: req.body.temp,
        date: req.body.date,
        content: req.body.feel
        } 
    projectData = newEntry;
    //res.send(projectData);
    };

