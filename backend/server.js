// Modules 
require("dotenv").config();
const app = require("express")();

// Static modules
const initiator = require("./configs/initiator");
const configViewEngine = require("./configs/viewEngine");

// Serving static file 
initiator.initStaticFilesServing(app);

// Define routers for specified routes 
initiator.initRouters(app);

// Define routers for API
initiator.initApiRouters(app);

// Config View Engine
configViewEngine(app); 

// Catch invalid client request url 
app.get("*", function (req, res) {
    res.send("Invalid URL, 404 not Found");
})

// Running server 
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at "http://localhost:${port}/<module_name>"`);
})