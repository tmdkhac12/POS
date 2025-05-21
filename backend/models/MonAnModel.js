const pool = require("../configs/connection").promise()

const getAllDishes = async function () {
    const sql = "SELECT * FROM monan"

    try {
        const [result] = await pool.query(sql);
        return result;
    } catch (error) {
        throw new Error("Get All Dishes query Error: " + error.message)
    }
}

const getDishesByGroup = async (group_id) => {
    const sql = "SELECT * FROM monan WHERE ma_nhom = ?"

    try {
        const [result] = await pool.query(sql, [group_id]);
        return result;
    } catch (error) {
        throw new Error("Get Dishes By Group query Error: " + error.message)
    }
}

module.exports = { 
    getAllDishes,
    getDishesByGroup
}