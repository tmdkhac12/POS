// API Controller
const hoaDonModel = require("../../models/HoaDonModel.js");
const chiTietHoaDonModel = require('../../models/ChiTietHoaDonModel.js');

const getPaginatedHoaDons = async (limit, offset) => {
    try {
        return await hoaDonModel.getHoaDonsJoinKhachHang(limit, offset);
    } catch (error) {
        console.error("Get getPaginatedHoaDons (HoaDonController): " + error.message);
        throw error;
    }
}

const viewHoaDon = async (id) => {
    try {
        const hoaDon = await hoaDonModel.getHoaDonJoinKhachHangById(id);
        const chiTiets = await chiTietHoaDonModel.getChiTietsOfHoaDon(id);

        return { hoaDon, chiTiets };
    } catch (error) {
        console.error("Get getPaginatedHoaDons (HoaDonController): " + error.message);
        throw error;
    }
}

module.exports = {
    getPaginatedHoaDons,
    viewHoaDon
}