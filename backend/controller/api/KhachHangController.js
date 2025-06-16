const khachHangModel = require('../../models/KhachHangModel.js');

const getPaginatedKhachHangs = async (limit, offset) => {
    try {
        return await khachHangModel.getKhachHangs(limit, offset);
    } catch (error) {
        console.error("Get Khach Hangs (KhachHangController): " + error.message);
        throw error;
    }
}

const countKhachHang = async () => {
    try {
        return await khachHangModel.getNumberOfKhachHang();
    } catch (error) {
        console.error("Count Khach Hang (KhachHangController): " + error.message);
        throw error;
    }
}

const addKhachHang = async (name, phone, total, accu, rank) => {
    try {
        return await khachHangModel.insertKhachHang5P(name, phone, total, accu, rank);
    } catch (error) {
        console.error("Add Khach Hang (KhachHangController): " + error.message);
        throw error;
    }
}

const updateKhachHang = async (name, phone, total, accu, rank, id) => {
    try {
        return await khachHangModel.updateKhachHang(name, phone, total, accu, rank, id);
    } catch (error) {
        console.error("Update Khach Hang (KhachHangController): " + error.message);
        throw error;
    }
}

const deleteKhachHang = async (id) => {
    try {
        return await khachHangModel.softDeleteKhachHang(id);
    } catch (error) {
        console.error("Delete Khach Hang (KhachHangController): " + error.message);
        throw error;
    }
}

module.exports = {
    getPaginatedKhachHangs,
    countKhachHang,
    addKhachHang,
    updateKhachHang,
    deleteKhachHang
}