const pool = require("../configs/connection").promise();

const getAllNhoms = async () => {
    const sql = "SELECT * FROM nhom";

    try {
        const [result] = await pool.query(sql);

        return result;
    } catch (error) {
        console.error("Get All Nhoms: " + error.message);
    }
}

const getNhoms = async (limit, offset) => {
    const sql = "select * from nhom limit ? offset ?";

    try {
        const [result] = await pool.execute(sql, [limit, offset]);

        return result;
    } catch (error) {
        console.error("Get Nhoms Limit Offset: " + error.message);
    }
}

const getNumberOfNhoms = async function () {
    const sql = "select count(*) as soluong from nhom";

    try {
        const [result] = await pool.query(sql);

        return result[0].soluong;
    } catch (error) {
        console.error("Get Number of Nhoms: " + error.message);
    }
}

module.exports = {
    getAllNhoms,
    getNhoms,
    getNumberOfNhoms
}