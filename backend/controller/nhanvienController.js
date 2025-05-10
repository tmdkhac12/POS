const banModel = require("../models/BanModel")
const monanModel = require("../models/MonAnModel")

const getHomePage = async function (req, res) {
    try {
        const tables = await banModel.getAllBans();

        const homePageData = {
            tables: tables,
            tableQuantity: tables.length
        }

        res.render("./nhanvien/index", { homePageData })
    } catch (error) {
        console.log("Error in nhanvienController", error)
    }
}

const getChiTietPage = async function (req, res) {
    const tableId = req.params.id;

    try {
        // Thực hiện các truy vấn song song với Promise.all()
        const [tableQuantity, dishes] = await Promise.all([
            banModel.getNumberOfTable(), 
            monanModel.getAllDishes()
        ])

        const chiTietPageData = {
            tableId: tableId,
            dishes: dishes
        }

        if (tableId > 0 && tableId <= tableQuantity) {
            res.render("./nhanvien/chitiet", { chiTietPageData })
        } else {
            res.send("Invalid URL, 404 not Found")
        }
    } catch (error) {
        console.log("Error in nhanvienController", error)
    }   

}

module.exports = {
    getHomePage,
    getChiTietPage,
};