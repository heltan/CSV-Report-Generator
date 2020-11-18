//build express app here, to serve up an html
//add express to client
//import express from 'express';
const express = require('express');
const app = express();
const port = 3000;
app.use(express.static('client'));
app.listen(port);
app.post('http://localhost:3000/', (req, res) => {
    console.log('being posted');
});

