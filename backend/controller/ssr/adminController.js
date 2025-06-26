// SSR Controller 
const banModel = require("../../models/BanModel.js");
const monAnModel = require("../../models/MonAnModel.js");
const khachHangModel = require("../../models/KhachHangModel.js");
const nhomModel = require("../../models/NhomModel.js");
const taiKhoanModel = require('../../models/TaiKhoanModel.js');
const khuyenMaiModel = require('../../models/KhuyenMaiModel.js');
const hoaDonModel = require('../../models/HoaDonModel.js');

const getHomePage = async function (req, res) {
    try {
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
            Promise.all([banModel.getBans(LIMIT, OFFSET), banModel.getNumberOfTable("")]),
            Promise.all([monAnModel.getDishesJoinGroupJoinKM(LIMIT, OFFSET), monAnModel.getNumberOfDishes("")]),
            Promise.all([khachHangModel.getKhachHangs(LIMIT, OFFSET), khachHangModel.getNumberOfKhachHang("")]),
            Promise.all([nhomModel.getNhoms(LIMIT, OFFSET), nhomModel.getNumberOfNhoms("")]),
            Promise.all([taiKhoanModel.getTaiKhoans(LIMIT, OFFSET), taiKhoanModel.getNumberOfTaiKhoan("")]),
            Promise.all([khuyenMaiModel.getKhuyenMais(LIMIT, OFFSET), khuyenMaiModel.getNumberOfKhuyenMai()]),
            Promise.all([hoaDonModel.getHoaDonsJoinKhachHang(LIMIT, OFFSET), hoaDonModel.getNumberOfHoaDon("", null, null)]),
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
    
        // console.log(hoaDonCount);
        res.render("./admin/index", homePageData);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Lỗi server");
    }
}

module.exports = {
    getHomePage
};