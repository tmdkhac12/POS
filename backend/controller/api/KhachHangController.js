const khachHangModel = require('../../models/KhachHangModel.js');

const getPaginatedKhachHangs = async (limit, offset) => {
    try {
        return await khachHangModel.getKhachHangs(limit, offset);
    } catch (error) {
        console.error("Get Khach Hangs (KhachHangController): " + error.message);
        throw error;
    }
}

module.exports = {
    getPaginatedKhachHangs
}