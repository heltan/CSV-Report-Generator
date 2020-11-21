//build express app here, to serve up an html
//add express to client
//import express from 'express';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { json } = require('express');
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
    //let str = JSON.stringify(req.body.text);
    
    //parse the obj into an obj
    let obj = (req.body);
    let returnData = changeCSV(obj);
    console.log('return data', returnData);
    //send it back in the response body
   //document.getElementById("current").innerHTML= (csv);
   //$('#current').html(csv);
   res.send(returnData);
   

});
let changeCSV = function (json) {
  let csv = json2csv(json);
 
  return csv;

}

//here is a function to concert json to csv and return the csv
let json2csv = (obj) => {
  //now we want to take out every key and put it into a string, separated with commas
  let keys = getKeys(obj);
  //now we want to get the rows
  getRows(obj);
  let rows = returnRows;
  //now we put it together into one string
  let stringForcsv = keys + '\n' + rows;
  return stringForcsv;

};

let returnKeys = '';
let returnRows = '';
let keysArr = [];

let getKeys = (object) => {
  for (let key in object) {
   //only add keys to the returnKeys if it doesn't already exist. no duplicate column names
    let currentRow = '';
    if (!returnKeys.includes(key.toString())) {
        returnKeys += '"' + key + '"' + ',';
        keysArr.push(key);
        
    }
    if (typeof object[key] === 'object' && !Array.isArray(object[key]) ) {
      getKeys(object[key]);
    } else if (Array.isArray(object[key])) {
      for (let i = 0; i < object[key].length; i++) {
        getKeys(object[key][i]);
      }
    }
  }
  return returnKeys;
};
//get rows function. this will go thru and grab the key[value] pair data. it will add a blank comma for missing info
let getRows = (object) => {
  let currentRow = '';
    for (let i = 0; i < keysArr.length; i ++) {
      let currentKey = keysArr[i];
      if (object[currentKey] && !Array.isArray(object[currentKey]) && typeof object[currentKey] !== 'object') {
        currentRow += '"' + object[currentKey] + '",';
      } else if (object[currentKey] === 'undefined' && !Array.isArray(object[currentKey]) && typeof object[currentKey] !== 'object') {
        currentRow += ',';
      }
    }
    returnRows += currentRow + '\n';
    for (let key in object) {
      if (typeof object[key] === 'object' && !Array.isArray(object[key])) {
        getRows(object[key]);
      } else if (Array.isArray(object[key])) {
        for (let i = 0; i < object[key].length; i++ ) {
          getRows(object[key][i]);
        }
      }
    }
    return;
};


//testing below a get request to /blah page
app.get('/blah', (req, res) => {
  console.log('asdfasdlkfja');
  res.send('you tried to reach this page?');
});

