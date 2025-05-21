const nhomModel = require("../models/NhomModel");
const banModel = require("../models/BanModel");
const monanModel = require('../models/MonAnModel');

const getHomePage = async (req, res) => {
    const tableId = req.params.id;

    try {
        // Lấy và kiểm tra thông tin bàn
        const tableInfo = await banModel.getTableById(tableId);
        if (tableInfo === undefined) {
            res.send("Invalid URL, 404 not Found");
            return;
        }

        // Lấy danh sách nav items 
        const groups = await nhomModel.getAllNhoms();

        // Lấy danh sách món ăn
        let dishes = [];
        for (const group of groups) {
            const dishesByGroup = await monanModel.getDishesByGroup(group.ma_nhom);
            dishes.push(dishesByGroup);
        }

        const homePageData = {
            tableInfo,
            groups,
            dishes
        };
        // console.log(groups);
        // console.log(tableInfo);
        // console.log(dishes);

        res.render("./khachhang/index", homePageData);
    } catch (error) {
        console.log("Lỗi khachHangController: " + error.message);
    }
}

module.exports = {
    getHomePage
}