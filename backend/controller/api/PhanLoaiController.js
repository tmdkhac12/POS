const nhomModel = require('../../models/NhomModel.js');

const getPaginatedPhanLoais = async (limit, offset) => {
    try {
        return await nhomModel.getNhoms(limit, offset);
    } catch (error) {
        console.error("Get getPaginatedPhanLoais (PhanLoaiController): " + error.message);
        throw error;
    }
}

module.exports = {
    getPaginatedPhanLoais
}