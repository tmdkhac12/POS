const path = require("path")

const getHomePage = function (req, res) {
    res.sendFile(path.join(__dirname, "../../frontend/khachhang/index.html"));
}

module.exports = {
    getHomePage
};