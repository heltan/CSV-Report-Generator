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
//now it posts to the server, but the req is empty?
app.post('/', (req, res) => {
    console.log('test');
    console.log('req', req.body);
    res.send(req.body);
});

