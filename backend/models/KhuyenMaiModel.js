const pool = require('../configs/connection.js').promise();

const getAllKhuyenMais = async () => {
    const sql = "select * from khuyenmai";

    try {
        const [result] = await pool.query(sql);

        return result;        
    } catch (error) {
        throw new Error("Get All Khuyen Mai (KhuyenMaiModel): " + error.message);
    }
}

const getKhuyenMais = async (limit, offset) => {
    const sql = "select * from khuyenmai limit ? offset ?";

    try {
        const [result] = await pool.execute(sql, [limit, offset]);

        return result;        
    } catch (error) {
        throw new Error("Get Khuyen Mai Limit Offset (KhuyenMaiModel): " + error.message);
    }
}

const getNumberOfKhuyenMai = async () => {
    const sql = "select count(*) as soluong from khuyenmai";

    try {
        const [result] = await pool.query(sql);

        return result[0].soluong;        
    } catch (error) {
        throw new Error("Get Number of Khuyen Mai (KhuyenMaiModel): " + error.message);
    }
}

module.exports = {
    getAllKhuyenMais,
    getNumberOfKhuyenMai,
    getKhuyenMais
}