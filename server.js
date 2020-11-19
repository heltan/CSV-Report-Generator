//build express app here, to serve up an html
//add express to client
//import express from 'express';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('client'));


app.listen(port, () => {
    console.log('server running on', port);
});
//here when user submits form, it posts to the server
app.post('/', (req, res) => {
    //req.body.text is the text of the submit input
    let stringData1 = req.body.text;
    //convert to JSON
    stringData1 = JSON.stringify(stringData1);
    //now we want to convert that input into csv
    let csvData = json2csv(stringData1);



    //send it back in the response body
    res.send(req.body);
});

//here is a function to concert json to csv and return the csv
let json2csv = (stringData) => {
  let string = JSON.parse(stringData);
  //now we want to take out every key and put it into an array

  console.log('string', string);


};

//this function just grabs the keys of an object and puts them into a string that is returned
let returnString = '';
let getKeys = (object) => {
  for (let keys in object) {
    returnString += keys + ',';
    if (typeof object[keys] === 'object') {
      getKeys(object[keys]);
    }
  }
  return returnString;

};

//testing below a get request to /blah page
app.get('/blah', (req, res) => {
  console.log('asdfasdlkfja');
  res.send('you tried to reach this page?');
});

