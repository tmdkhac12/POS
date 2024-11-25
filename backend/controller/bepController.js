const path = require("path")

const getHomePage = function (req, res) {
    res.sendFile(path.join(__dirname, "../../frontend/bep/index.html"));
}

module.exports = {
    getHomePage
};