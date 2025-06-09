const pool = require('../configs/connection.js').promise();

const getAllTaiKhoans = async () => {
    const sql = "select * from taikhoan";

    try {
        const [result] = await pool.query(sql);

        return result;        
    } catch (error) {
        throw new Error("Get All Tai Khoan (TaiKhoanModel): " + error.message);
    }
}

const getTaiKhoans = async (limit, offset) => {
    const sql = "select * from taikhoan limit ? offset ?";

    try {
        const [result] = await pool.execute(sql, [limit, offset]);

        return result;        
    } catch (error) {
        console.error("Get Tai Khoan Limit Offset (TaiKhoanModel): " + error.message);
    }
}

const getNumberOfTaiKhoan = async () => {
    const sql = "select count(*) as soluong from taikhoan";

    try {
        const [result] = await pool.query(sql);

        return result[0].soluong;        
    } catch (error) {
        console.error("Get Number of Tai Khoan (TaiKhoanModel): " + error.message);
    }
}

module.exports = {
    getAllTaiKhoans,
    getNumberOfTaiKhoan,
    getTaiKhoans
}