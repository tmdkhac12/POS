const path = require("path")

const getHomePage = function (req, res) {
    res.render("bep/index");
}

module.exports = {
    getHomePage 
};