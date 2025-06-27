const pool = require('../configs/connection.js').promise();

const getAllKhuyenMais = async () => {
    const sql = "select * from khuyenmai where is_deleted = 0";

    try {
        const [result] = await pool.query(sql);

        return result;
    } catch (error) {
        throw new Error("Get All Khuyen Mai (KhuyenMaiModel): " + error.message);
    }
}

const getKhuyenMais = async (limit, offset) => {
    const sql = "select * from khuyenmai where is_deleted = 0 limit ? offset ?";

    try {
        const [result] = await pool.execute(sql, [limit, offset]);

        return result;
    } catch (error) {
        throw new Error("Get Khuyen Mai Limit Offset (KhuyenMaiModel): " + error.message);
    }
}

const searchKhuyenMais = async (name, start, end, limit, offset) => {
    const sql = `SELECT * FROM khuyenmai
                WHERE is_deleted = 0 
                and ten_khuyen_mai like ? 
                and (? IS NULL OR ngay_bat_dau >= ?) AND (? IS NULL OR ngay_ket_thuc <= ?)
                LIMIT ? OFFSET ?`;

    try {
        const [result] = await pool.execute(sql, [`%${name}%`, start, start, end, end, limit, offset]);

        return result;
    } catch (error) {
        throw new Error("Search Khuyen Mai Limit Offset (KhuyenMaiModel): " + error.message);
    }
}

const getNumberOfKhuyenMai = async (name, start, end) => {
    const sql = `select count(*) as soluong 
                from khuyenmai 
                where is_deleted = 0
                and ten_khuyen_mai like ? 
                and (? IS NULL OR ngay_bat_dau >= ?) AND (? IS NULL OR ngay_ket_thuc <= ?)`;

    try {
        const [result] = await pool.execute(sql, [`%${name}%`, start, start, end, end]);

        return result[0].soluong;
    } catch (error) {
        throw new Error("Get Number of Khuyen Mai (KhuyenMaiModel): " + error.message);
    }
}

const insertKhuyenMai = async (name, percent, money, start, end) => {
    const sql = `insert into khuyenmai(ten_khuyen_mai, giam_theo_phan_tram, giam_theo_tien, ngay_bat_dau, ngay_ket_thuc)
                 values(?, ?, ?, ?, ?)`;

    try {
        const [result] = await pool.execute(sql, [name, percent, money, start, end]);

        return result.affectedRows > 0;
    } catch (error) {
        throw new Error("Insert Khuyen Mai (KhuyenMaiModel): " + error.message)
    }
}

const updateKhuyenMai = async (name, percent, money, start, end, id) => {
    const sql = `update khuyenmai set ten_khuyen_mai = ?, giam_theo_phan_tram = ?, giam_theo_tien = ?, ngay_bat_dau = ?, ngay_ket_thuc = ?
                 where ma_khuyen_mai = ?`;

    try {
        const [result] = await pool.execute(sql, [name, percent, money, start, end, id]);

        return result.affectedRows > 0;
    } catch (error) {
        throw new Error("Update Khuyen Mai (KhuyenMaiModel): " + error.message)
    }
}

const deleteKhuyenMai = async (id) => {
    const sql = `update khuyenmai set is_deleted = 1 where ma_khuyen_mai = ?`;

    try {
        const [result] = await pool.execute(sql, [id]);

        return result.affectedRows > 0;
    } catch (error) {
        throw new Error("Delete Khuyen Mai (KhuyenMaiModel): " + error.message)
    }
}

module.exports = {
    getAllKhuyenMais, getNumberOfKhuyenMai, getKhuyenMais,
    insertKhuyenMai,
    updateKhuyenMai,
    deleteKhuyenMai,
    searchKhuyenMais
}