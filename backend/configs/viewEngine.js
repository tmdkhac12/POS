const path = require("path")

const configViewEngine = function (app) {
    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "../../frontend"));
}

module.exports = configViewEngine
