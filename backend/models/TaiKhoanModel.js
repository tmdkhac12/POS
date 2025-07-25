const pool = require('../configs/connection.js').promise();

const getAllTaiKhoans = async () => {
    const sql = "select * from taikhoan where is_deleted = 0";

    try {
        const [result] = await pool.query(sql);

        return result;
    } catch (error) {
        throw new Error("Get All Tai Khoan (TaiKhoanModel): " + error.message);
    }
}

const getTaiKhoans = async (limit, offset) => {
    const sql = "select * from taikhoan where is_deleted = 0 limit ? offset ?";

    try {
        const [result] = await pool.execute(sql, [limit, offset]);

        return result;
    } catch (error) {
        console.error("Get Tai Khoan Limit Offset (TaiKhoanModel): " + error.message);
    }
}

const getRoleId = async (username) => {
    const sql = "select ma_nhom_quyen from taikhoan where username = ? and is_deleted = 0";

    try {
        const [result] = await pool.execute(sql, [username]);

        return result[0].ma_nhom_quyen;
    } catch (error) {
        console.error("Get Role Id (TaiKhoanModel): " + error.message);
    }
}

const searchTaiKhoans = async (name, limit, offset) => {
    const sql = `select * from taikhoan 
                where (username like ? or ma_nhom_quyen like ?) and is_deleted = 0 limit ? offset ?`;

    try {
        const [result] = await pool.execute(sql, [`%${name}%`, `%${name}%`, limit, offset]);

        return result;
    } catch (error) {
        console.error("Search Tai Khoan Limit Offset (TaiKhoanModel): " + error.message);
    }
}

const getNumberOfTaiKhoan = async (name) => {
    const sql = `select count(*) as soluong from taikhoan 
                where (username like ? or ma_nhom_quyen like ?) and is_deleted = 0`;

    try {
        const [result] = await pool.execute(sql, [`%${name}%`, `%${name}%`]);

        return result[0].soluong;
    } catch (error) {
        console.error("Get Number of Tai Khoan (TaiKhoanModel): " + error.message);
    }
}

const isExistUsername = async (username) => {
    const sql = "select * from taikhoan where username = ? and is_deleted = 0";

    try {
        const [result] = await pool.execute(sql, [username]);

        return result[0] ? true : false;
    } catch (error) {
        console.error("Is Exist Username (TaiKhoanModel): " + error.message);
    }
}

const isExistUsernameExcept = async (username, id) => {
    const sql = "select * from taikhoan where username = ? and ma_tai_khoan <> ? and is_deleted = 0";

    try {
        const [result] = await pool.execute(sql, [username, id]);

        return result[0] ? true : false;
    } catch (error) {
        console.error("Is Exist Username Except Id (TaiKhoanModel): " + error.message);
    }
}

const getPassword = async (username) => {
    const sql = "select hashPassword from taikhoan where username = ? and is_deleted = 0";

    try {
        const [result] = await pool.execute(sql, [username]);

        return result[0].hashPassword;
    } catch (error) {
        console.error("Get admin password (TaiKhoanModel): " + error.message);
    }
}

const insertTaiKhoan = async (username, hashPassword, roleId) => {
    const sql = `insert into taikhoan (username, hashPassword, ma_nhom_quyen) 
                values (?, ?, ?)`;

    try {
        const [result] = await pool.execute(sql, [username, hashPassword, roleId]);

        return result.affectedRows > 0;
    } catch (error) {
        console.error("Insert Tai Khoan (TaiKhoanModel): " + error.message);
    }
}

const updateTaiKhoan = async (username, hashPassword, roleId, id) => {
    const sql = `update taikhoan set username = ?, hashPassword = ?, ma_nhom_quyen = ? 
                where ma_tai_khoan = ?`;

    try {
        const [result] = await pool.execute(sql, [username, hashPassword, roleId, id]);

        return result.affectedRows > 0;
    } catch (error) {
        console.error("Update Tai Khoan (TaiKhoanModel): " + error.message);
    }
}

const updateWithoutPassword = async (username, roleId, id) => {
    const sql = `update taikhoan set username = ?, ma_nhom_quyen = ? 
                where ma_tai_khoan = ?`;

    try {
        const [result] = await pool.execute(sql, [username, roleId, id]);

        return result.affectedRows > 0;
    } catch (error) {
        console.error("Update Tai Khoan Without Password (TaiKhoanModel): " + error.message);
    }
}

const softDeleteTaiKhoan = async (id) => {
    const sql = `update taikhoan set is_deleted = 1 where ma_tai_khoan = ?`;

    try {
        const [result] = await pool.execute(sql, [id]);

        return result.affectedRows > 0;
    } catch (error) {
        console.error("Soft Delete Tai Khoan (TaiKhoanModel): " + error.message);
    }
}

module.exports = {
    getAllTaiKhoans, getNumberOfTaiKhoan, getTaiKhoans, getPassword, getRoleId,
    isExistUsername, isExistUsernameExcept,
    insertTaiKhoan,
    updateTaiKhoan, updateWithoutPassword,
    softDeleteTaiKhoan,
    searchTaiKhoans
}