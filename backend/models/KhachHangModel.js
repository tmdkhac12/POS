const pool = require('../configs/connection.js').promise();

const getAllKhachHangs = async () => {
    const sql = "select * from khachhang";

    try {
        const [result] = await pool.query(sql);

        return result;        
    } catch (error) {
        throw new Error("Get All Khach Hang (KhachHangModel): " + error.message);
    }
}

const getKhachHangs = async (limit, offset) => {
    const sql = "select * from khachhang limit ? offset ?";

    try {
        const [result] = await pool.execute(sql, [limit, offset]);

        return result;        
    } catch (error) {
        throw new Error("Get Khach Hang Limit Offset (KhachHangModel): " + error.message);
    }
}

const getNumberOfKhachHang = async () => {
    const sql = "select count(*) as soluong from khachhang";

    try {
        const [result] = await pool.query(sql);

        return result[0].soluong;        
    } catch (error) {
        throw new Error("Get Number of Khach Hang (KhachHangModel): " + error.message);
    }
}

module.exports = {
    getAllKhachHangs,
    getNumberOfKhachHang,
    getKhachHangs
}