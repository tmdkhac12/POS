const khuyenMaiModel = require('../../models/KhuyenMaiModel.js');

const getPaginatedKhuyenMais = async (limit, offset) => {
    try {
        return await khuyenMaiModel.getKhuyenMais(limit, offset);
    } catch (error) {
        console.error("Get getPaginatedKhuyenMais (KhuyenMaiController): " + error.message);
        throw error;
    }
}

module.exports = {
    getPaginatedKhuyenMais
}