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

//below is my test json object
/*
{
    "employee": {
        "name":       "bob",
        "salary":      56000,
        "married":    true
    },
    "employee": {
        "name":       "alice",
        "salary":      1,
        "married":    false
    }
}
*/
//here when user submits form, it posts to the server
app.post('/', (req, res) => {
    //req.body.text is the text of the submit input
    //let str = JSON.stringify(req.body.text);

    //parse the obj into an obj
    let obj = (req.body.text);
    obj = JSON.parse(obj);

    json2csv(obj);




    //send it back in the response body
    res.send(req.body.text);
});

//here is a function to concert json to csv and return the csv
let json2csv = (obj) => {

  //now we want to take out every key and put it into a string, separated with commas
  let columns = getKeys(obj);
  let columns = returnKeys;
  getRows(obj);


};

let returnKeys = '';
let returnRows = '';
let keysArr = [];

let getKeys = (object) => {
  for (let keys in object) {
   //only add keys to the returnKeys if it doesn't already exist. no duplicate column names
    if (!returnKeys.includes(keys.toString())) {
        returnKeys += '"' + keys+ '"' + ',';
        keysArr.push(keys);
    }
    if (typeof object[keys] === 'object') {
      getKeys(object[keys]);
    }
  }
  return returnKeys;
};
//get rows function. this will go thru and grab the keyb[value] pair data. it will add a blank comma for missing info
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
    for (let keys in object) {
      if (typeof object[keys] === 'object') {
        getRows(object[keys]);
      }
    }
    return;
};


//testing below a get request to /blah page
app.get('/blah', (req, res) => {
  console.log('asdfasdlkfja');
  res.send('you tried to reach this page?');
});

