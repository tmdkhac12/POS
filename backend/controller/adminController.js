const banModel = require("../models/BanModel.js");
const monAnModel = require("../models/MonAnModel.js");
const khachHangModel = require("../models/KhachHangModel.js");
const nhomModel = require("../models/NhomModel.js");
const taiKhoanModel = require('../models/TaiKhoanModel.js');
const khuyenMaiModel = require('../models/KhuyenMaiModel.js');
const hoaDonModel = require('../models/HoaDonModel.js');

const getHomePage = async function (req, res) {
    const LIMIT = 8;
    const OFFSET = 0;
    
    const [
        [bans, banCount],
        [monAns, monAnCount],
        [khachHangs, khachHangCount],
        [nhoms, nhomCount],
        [taiKhoans, taiKhoanCount],
        [khuyenMais, khuyenMaiCount],
        [hoaDons, hoaDonCount]
    ] = await Promise.all([
        Promise.all([banModel.getBans(LIMIT, OFFSET), banModel.getNumberOfTable()]),
        Promise.all([monAnModel.getDishesJoinGroup(LIMIT, OFFSET), monAnModel.getNumberOfDishes()]),
        Promise.all([khachHangModel.getKhachHangs(LIMIT, OFFSET), khachHangModel.getNumberOfKhachHang()]),
        Promise.all([nhomModel.getNhoms(LIMIT, OFFSET), nhomModel.getNumberOfNhoms()]),
        Promise.all([taiKhoanModel.getTaiKhoans(LIMIT, OFFSET), taiKhoanModel.getNumberOfTaiKhoan()]),
        Promise.all([khuyenMaiModel.getKhuyenMais(LIMIT, OFFSET), khuyenMaiModel.getNumberOfKhuyenMai()]),
        Promise.all([hoaDonModel.getHoaDonsJoinKhachHang(LIMIT, OFFSET), hoaDonModel.getNumberOfHoaDon()]),
    ])

    const homePageData = {
        bans,
        monAns,
        khachHangs,
        nhoms,
        taiKhoans,
        khuyenMais,
        hoaDons,

        banCount,
        monAnCount,
        khachHangCount,
        nhomCount,
        taiKhoanCount,
        khuyenMaiCount,
        hoaDonCount
    }

    // console.log(hoaDons[0]);
    res.render("./admin/index", homePageData);
}

module.exports = {
    getHomePage
};