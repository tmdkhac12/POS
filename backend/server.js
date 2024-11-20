// Modules 
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

// Static modules
const initiator = require("./configs/initiator");

dotenv.config();
const app = express();

// Serving static file 
initiator.initStaticFilesServing(app);

// Define routers for specified routes 
initiator.initRouters(app);

// Catch invalid client request url 
app.get("*", function (req, res) {
    res.send("Invalid URL, 404 not Found");
})

// Running server 
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at "http://localhost:${port}/<module_name>"`);
})