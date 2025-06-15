const nhomModel = require('../../models/NhomModel.js');

const getPaginatedPhanLoais = async (limit, offset) => {
    try {
        return await nhomModel.getNhoms(limit, offset);
    } catch (error) {
        console.error("Get Paginated Phan Loai (PhanLoaiController): " + error.message);
        throw error;
    }
}

const countPhanLoai = async () => {
    try {
        return await nhomModel.getNumberOfNhoms();
    } catch (error) {
        console.error("Count Phan Loai (PhanLoaiController): " + error.message);
        throw error;
    }
}

const addPhanLoai = async (categoryName, imageName) => {
    try {
        return await nhomModel.insertNhom(categoryName, imageName);
    } catch (error) {
        console.error("Add Phan Loai (PhanLoaiController): " + error.message);
        throw error;
    }   
}

const updatePhanLoai = async (categoryName, imageName, id) => {
    try {
        return await nhomModel.updateNhom(categoryName, imageName, id);
    } catch (error) {
        console.error("Update Phan Loai (PhanLoaiController): " + error.message);
        throw error;
    }   
}

const updateNamePhanLoai = async (categoryName, id) => {
    try {
        return await nhomModel.updateNameNhom(categoryName, id);
    } catch (error) {
        console.error("Update Phan Loai (PhanLoaiController): " + error.message);
        throw error;
    }
}

const deletePhanLoai = async (id) => {
    try {
        return await nhomModel.softDeleteNhom(id);
    } catch (error) {
        console.error("Delete Phan Loai (PhanLoaiController): " + error.message);
        throw error;
    }
}

module.exports = {
    getPaginatedPhanLoais,
    countPhanLoai,
    addPhanLoai,
    updatePhanLoai, updateNamePhanLoai,
    deletePhanLoai
}