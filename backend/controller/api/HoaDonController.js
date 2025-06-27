// API Controller
const hoaDonModel = require("../../models/HoaDonModel.js");
const chiTietHoaDonModel = require('../../models/ChiTietHoaDonModel.js');

const getPaginatedHoaDons = async (key, start, end, limit, offset) => {
    try {
        return await hoaDonModel.searchHoaDon(key, start, end, limit, offset);
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
        console.error("View Hoa Don (HoaDonController): " + error.message);
        throw error;
    }
}

const countHoaDon = async (key = "", start = null, end = null) => {
    try {
        return await hoaDonModel.getNumberOfHoaDon(key, start, end);
    } catch (error) {
        console.error("Count Hoa Don (HoaDonController): " + error.message);
        throw error;
    }
}

module.exports = {
    getPaginatedHoaDons,
    viewHoaDon,
    countHoaDon
}