const taiKhoanModel = require('../../../models/TaiKhoanModel.js');
const bcrypt = require('bcrypt');

const getPaginatedTaiKhoans = async (name, limit, offset) => {
    try {
        return await taiKhoanModel.searchTaiKhoans(name, limit, offset);
    } catch (error) {
        console.error("Get Tai Khoans (TaiKhoanController): " + error.message);
        throw error;
    }
}

const checkLogin = async (username, inputPassword) => {
    try {
        if (!await taiKhoanModel.isExistUsername(username)) {
            return -1; // Username does not exist
        }

        const userPassword = await taiKhoanModel.getPassword(username);
        if (!await bcrypt.compare(inputPassword, userPassword)) {
            return -2; // Incorrect password
        }

        const roleId = await taiKhoanModel.getRoleId(username);
        return roleId;
    } catch (error) {
        console.error("Check Login (TaiKhoanController): " + error.message);
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
        // Kiểm tra username đã tồn tại chưa
        if (await taiKhoanModel.isExistUsernameExcept(username, id))
            return -1;

        // Kiểm tra mật khẩu admin có chính xác 
        const adminHashed = await taiKhoanModel.getPassword(adminUsername); 
        if (!await bcrypt.compare(adminPassword, adminHashed)) {
            return -2;
        }

        // Có update mật khẩu hay không?
        if (!newPassword) {
            return await taiKhoanModel.updateWithoutPassword(username, roleId, id);
        } else {
            const hashNewPassword = await bcrypt.hash(newPassword, 12);
            return await taiKhoanModel.updateTaiKhoan(username, hashNewPassword, roleId, id);
        }

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

const countTaiKhoan = async (name = "") => {
    try {
        return await taiKhoanModel.getNumberOfTaiKhoan(name);
    } catch (error) {
        console.error("Count Tai Khoan (TaiKhoanController): " + error.message);
        throw error;
    }
}

module.exports = {
    getPaginatedTaiKhoans,
    checkLogin,
    addTaiKhoan,
    updateTaiKhoan,
    deleteTaiKhoan,
    countTaiKhoan
}