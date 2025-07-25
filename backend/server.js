// Modules 
require("dotenv").config();
const express = require("express");
const http = require('http');

const app = express();
const server = http.createServer(app);

// Static modules
const initiator = require("./configs/initiator");
const configViewEngine = require("./configs/viewEngine");

// Config View Engine
configViewEngine(app); 

// Serving static file 
initiator.initStaticFilesServing(app);

// Define routers for specified routes 
initiator.initRouters(app);

// Define routers for API 
app.use(express.json());
initiator.initApiRouters(app);

// Config Socket IO
initiator.initSocketIO(server);

// Catch invalid client request url 
app.get("*", function (req, res) {
    res.send("Invalid URL, 404 not Found");
})

// Running server 
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running at "http://localhost:${PORT}/<module_name>"`);
})