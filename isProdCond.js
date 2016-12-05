"use strict";

import bodyParser from "body-parser";
import express from "express";
import httpRequest from "request-promise";
import moment from "moment-timezone";
import morgan from "morgan";
import path from "path";
import webpack from "webpack";

var config = require("./config.js");
var database = require("./module/database.js");
var queryString = require("./model/queryString.js");
var telegramBot = require("./model/telegramBot.js");
//var telegramChat = require("./model/telegramChat.js");
var telegramUser = require("./model/telegramUser.js");
var upgiSystem = require("./module/upgiSystem.js");
import webpackConfig from "./webpack.config.dev.js";

var app = express();
var compiler = webpack(webpackConfig);
app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
//var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json()); // parse application/json
//var jsonParser = bodyParser.json();

// serve static files
app.use("/isProdCond/image", express.static("./public/image"));
app.use("/isProdCond/bower_modules", express.static("./public/bower_modules"));

app.get("/isProdCond/input", function(request, response) { // serve mobile page
    return response.status(200).sendFile(path.join(__dirname, "public/input.html"));
});

app.listen(config.serverPort, function(error) { // start backend server
    if (error) {
        console.log("unable to start isProdCond server: " + error);
    } else {
        console.log(moment(moment(), "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") + " " +
            "isProdCond system in operation...(" + config.serverUrl + ")");
    }
});