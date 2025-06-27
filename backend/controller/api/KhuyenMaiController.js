const khuyenMaiModel = require('../../models/KhuyenMaiModel.js');

const getPaginatedKhuyenMais = async (name, start, end, limit, offset) => {
    try {
        return await khuyenMaiModel.searchKhuyenMais(name, start, end, limit, offset);
    } catch (error) {
        console.error("Get getPaginatedKhuyenMais (KhuyenMaiController): " + error.message);
        throw error;
    }
}

const addKhuyenMai = async (name, percent, money, start, end) => {
    try {
        return await khuyenMaiModel.insertKhuyenMai(name, percent, money, start, end);
    } catch (error) {
        console.error("Add Khuyen Mai (KhuyenMaiController): " + error.message);
        throw error;
    }
}

const updateKhuyenMai = async (name, percent, money, start, end, id, option) => {
    try {
        if (option === "money") {
            return await khuyenMaiModel.updateKhuyenMai(name, null, money, start, end, id);
        } else if (option === "percent") {
            return await khuyenMaiModel.updateKhuyenMai(name, percent, null, start, end, id);
        } else {
            return false;
        }
    } catch (error) {
        console.error("Update Khuyen Mai (KhuyenMaiController): " + error.message);
        throw error;
    }
}

const deleteKhuyenMai = async (id) => {
    try {
        return await khuyenMaiModel.deleteKhuyenMai(id);
    } catch (error) {
        console.error("Delete Khuyen Mai (KhuyenMaiController): " + error.message);
        throw error;
    }
}

const countKhuyenMai = async (name = "", start = null, end = null) => {
    try {
        return await khuyenMaiModel.getNumberOfKhuyenMai(name, start, end);
    } catch (error) {
        console.error("Count Khuyen Mai (KhuyenMaiController): " + error.message);
        throw error;
    }
}

module.exports = {
    getPaginatedKhuyenMais,
    addKhuyenMai,
    updateKhuyenMai,
    deleteKhuyenMai,
    countKhuyenMai
}