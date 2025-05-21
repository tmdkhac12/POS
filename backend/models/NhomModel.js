const pool = require("../configs/connection").promise();

const getAllNhoms = async () => {
    const sql = "SELECT * FROM nhom";

    try {
        const [result] = await pool.execute(sql);

        return result;
    } catch (error) {
        throw new Error("Lỗi ở NhomModel: ", error.message);
    }
}

module.exports = {
    getAllNhoms
}