const pool = require("../configs/connection").promise();

const getAllNhoms = async () => {
    const sql = "SELECT * FROM nhom";

    try {
        const [result] = await pool.query(sql);

        return result;
    } catch (error) {
        throw new Error("Get All Nhoms (NhomModel): " + error.message);
    }
}

const getNhoms = async (limit, offset) => {
    const sql = "select * from nhom limit ? offset ?";

    try {
        const [result] = await pool.execute(sql, [limit, offset]);

        return result;
    } catch (error) {
        throw new Error("Get Nhoms Limit Offset (NhomModel): " + error.message);
    }
}

const getNumberOfNhoms = async function () {
    const sql = "select count(*) as soluong from nhom";

    try {
        const [result] = await pool.query(sql);

        return result[0].soluong;
    } catch (error) {
        throw new Error("Get Number of Nhoms (NhomModel): " + error.message);
    }
}

module.exports = {
    getAllNhoms,
    getNhoms,
    getNumberOfNhoms
}