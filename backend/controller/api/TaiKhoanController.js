const taiKhoanModel = require('../../models/TaiKhoanModel.js');

const getPaginatedTaiKhoans = async (limit, offset) => {
    try {
        return await taiKhoanModel.getTaiKhoans(limit, offset);
    } catch (error) {
        console.error("Get Tai Khoans (TaiKhoanController): " + error.message);
        throw error;
    }
}

module.exports = {
    getPaginatedTaiKhoans
}