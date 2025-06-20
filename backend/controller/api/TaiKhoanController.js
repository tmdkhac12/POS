const taiKhoanModel = require('../../models/TaiKhoanModel.js');
const bcrypt = require('bcrypt');

const getPaginatedTaiKhoans = async (limit, offset) => {
    try {
        return await taiKhoanModel.getTaiKhoans(limit, offset);
    } catch (error) {
        console.error("Get Tai Khoans (TaiKhoanController): " + error.message);
        throw error;
    }
}

const addTaiKhoan = async (username, password, roleId) => {
    try {
        if (await taiKhoanModel.isExistUsername(username))
            return -1;

        const hashPassword = await bcrypt.hash(password, 12);
        return await taiKhoanModel.insertTaiKhoan(username, hashPassword, roleId);
    } catch (error) {
        console.error("Add Tai Khoan (TaiKhoanController): " + error.message);
        throw error;
    }
}

const updateTaiKhoan = async (username, newPassword, adminUsername, adminPassword, roleId, id) => {
    try {
        if (await taiKhoanModel.isExistUsernameExcept(username, id))
            return -1;

        const adminHashed = await taiKhoanModel.getAdminPassword(adminUsername); 
        if (!await bcrypt.compare(adminPassword, adminHashed)) {
            return -2;
        }

        const hashNewPassword = await bcrypt.hash(newPassword, 12);
        return await taiKhoanModel.updateTaiKhoan(username, hashNewPassword, roleId, id);
    } catch (error) {
        console.error("Update Tai Khoan (TaiKhoanController): " + error.message);
        throw error;
    }
}

const deleteTaiKhoan = async (id) => {
    try {
        return await taiKhoanModel.softDeleteTaiKhoan(id);
    } catch (error) {
        console.error("Delete Tai Khoan (TaiKhoanController): " + error.message);
        throw error;
    }
}

const countTaiKhoan = async () => {
    try {
        return await taiKhoanModel.getNumberOfTaiKhoan();
    } catch (error) {
        console.error("Count Tai Khoan (TaiKhoanController): " + error.message);
        throw error;
    }
}

module.exports = {
    getPaginatedTaiKhoans,
    addTaiKhoan,
    updateTaiKhoan,
    deleteTaiKhoan,
    countTaiKhoan
}