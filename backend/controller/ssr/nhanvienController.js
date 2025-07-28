const banModel = require("../../models/BanModel");
const monanModel = require("../../models/MonAnModel");
const nhomModel = require('../../models/NhomModel');
const currentOrderModel = require("../../models/CurrentOrderModel");

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
        // Lấy danh sách bàn 
        const tables = await banModel.getEmptyTable();

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
            tables,
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

const getPaymentPage = async function (req, res) {
    try {
        const tableId = req.params.tableId;

        // Lấy orders của bàn
        const orders = await currentOrderModel.getCurrentOrdersByTableJoinDish(tableId);

        res.render("./nhanvien/payment", { orders});
    } catch (error) {
        console.error("Error in getPaymentPage: " + error.message);
        res.status(500).send("Lỗi Server");
    }
}

module.exports = {
    getHomePage,
    getChiTietPage,
    getPaymentPage
};