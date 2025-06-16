const pool = require('../configs/connection.js').promise();

const getAllKhachHangs = async () => {
    const sql = "select * from khachhang where is_deleted = 0";

    try {
        const [result] = await pool.query(sql);

        return result;
    } catch (error) {
        throw new Error("Get All Khach Hang (KhachHangModel): " + error.message);
    }
}

const getKhachHangs = async (limit, offset) => {
    const sql = "select * from khachhang where is_deleted = 0 limit ? offset ?";

    try {
        const [result] = await pool.execute(sql, [limit, offset]);

        return result;
    } catch (error) {
        throw new Error("Get Khach Hang Limit Offset (KhachHangModel): " + error.message);
    }
}

const getNumberOfKhachHang = async () => {
    const sql = "select count(*) as soluong from khachhang where is_deleted = 0";

    try {
        const [result] = await pool.query(sql);

        return result[0].soluong;
    } catch (error) {
        throw new Error("Get Number of Khach Hang (KhachHangModel): " + error.message);
    }
}

const insertKhachHang5P = async (name, phone, total, accu, rank) => {
    const sql = `insert into khachhang(ten_khach_hang, so_dien_thoai, tong_chi_tieu, tien_tich_luy, cap_bac) 
                values(?, ?, ?, ?, ?)`;

    try {
        const [result] = await pool.execute(sql, [name, phone, total, accu, rank]);

        return result.affectedRows > 0;
    } catch (error) {
        throw new Error("Insert Khach Hang 5P (KhachHangModel): " + error.message)
    }
}

const updateKhachHang = async (name, phone, total, accu, rank, id) => {
    const sql = `update khachhang set ten_khach_hang = ?, so_dien_thoai = ?, tong_chi_tieu = ?, tien_tich_luy = ?, cap_bac = ? 
                where ma_khach_hang = ?`;

    try {
        const [result] = await pool.execute(sql, [name, phone, total, accu, rank, id]);

        return result.affectedRows > 0;
    } catch (error) {
        throw new Error("Update Khach Hang (KhachHangModel): " + error.message)
    }
}

const softDeleteKhachHang = async (id) => {
    const sql = "update khachhang set is_deleted = 1 where ma_khach_hang = ?";

    try {
        const [result] = await pool.execute(sql, [id]);

        return result.affectedRows > 0;
    } catch (error) {
        throw new Error("Soft Delete Khach Hang (KhachHangModel): " + error.message)
    }
}

module.exports = {
    getAllKhachHangs, getNumberOfKhachHang, getKhachHangs,
    insertKhachHang5P,
    updateKhachHang,
    softDeleteKhachHang
}