//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _= require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));

const routes = require('./server/routes/user');
app.use('/', routes);

app.listen(3000, () => {
    console.log("Server started on port 3000");
});