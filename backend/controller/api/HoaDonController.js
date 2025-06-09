// API Controller
const hoaDonModel = require("../../models/HoaDonModel.js");

const getPaginatedHoaDons = async (limit, offset) => {
    try {
        return await hoaDonModel.getHoaDonsJoinKhachHang(limit, offset);
    } catch (error) {
        console.error("Get getPaginatedHoaDons (HoaDonController): " + error.message);
        throw error;
    }
}

module.exports = {
    getPaginatedHoaDons
}