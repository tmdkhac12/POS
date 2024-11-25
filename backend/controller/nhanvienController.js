const path = require("path")
const connection = require("../configs/connection");

const getHomePage = function (req, res) {
    connection.query("select COUNT(*) as 'quantity' FROM ban;",
        (err, result, fields) => {
            if (err) {
                console.log("Error in controller");
                return;
            }
 
            // console.log(result);
            res.render("nhanvien/index", {tableQuantity: JSON.stringify(result[0].quantity)});
        }
    )
}

const getChiTietPage = function (req, res) {
    res.render("nhanvien/chitiet", {tableID: req.params.id});
}

module.exports = {
    getHomePage,
    getChiTietPage
};