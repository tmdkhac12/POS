const banModel = require("../../models/BanModel");
const monanModel = require("../../models/MonAnModel");
const nhomModel = require('../../models/NhomModel');

const getHomePage = async function (req, res) {
    try {
        // Lấy danh sách bàn
        const tables = await banModel.getAllBans();

        const homePageData = {
            tables
        }

        // console.log(tables)
        res.render("./nhanvien/index", homePageData);
    } catch (error) {
        console.error("Error in getHomePage: " + error.message);
        res.status(500).send("Lỗi Server");
    }
}

const getChiTietPage = async function (req, res) {
    const tableId = req.params.id;

    try {
        // Lấy thông tin bàn 
        const tableInfo = await banModel.getTableById(tableId);
        if (tableInfo === undefined) {
            res.send("Invalid URL, 404 not found");
            return;
        }

        // Lấy danh sách nav items 
        const groups = await nhomModel.getAllNhoms();

        // Lấy danh sách món ăn 
        const dishes = [];
        for (const group of groups) {
            dishes.push(await monanModel.getDishesByGroup(group.ma_nhom));
        }

        const chiTietPageData = {
            tableInfo,
            groups,
            dishes
        }

        // console.log(dishes[0]);
        res.render("./nhanvien/chitiet", chiTietPageData);
    } catch (error) {
        console.log("Error in getChiTietPage: ", error.message);
        res.status(500).send("Lỗi Server");
    }

}

module.exports = {
    getHomePage,
    getChiTietPage
};