const express = require('express');
const app = express();
const fs = require("fs");

app.use(express.static('./public'));

app.listen('80');

console.log('server listening');


app.get('/obj',function(req,res){
    var obj = JSON.parse(fs.readFileSync('obj.json', 'utf8'));
    res.json(obj);
});

app.get('/obj2',function(req,res){
    var obj = JSON.parse(fs.readFileSync('obj2.json', 'utf8'));
    res.json(obj);
});