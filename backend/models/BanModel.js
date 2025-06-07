const pool = require("../configs/connection").promise();

const getAllBans = async () => {
    const sql = "SELECT * FROM BAN";
    
    try {
        const [result] = await pool.query(sql);
        return result;
    } catch (error) {
        throw new Error("Get All Ban query Error: " + error.message)
    }
}

const getBans = async (limit, offset) => {
    const sql = "SELECT * FROM ban LIMIT ? OFFSET ?";

    try {
        const [result] = await pool.execute(sql, [limit, offset]);
        return result;
    } catch (error) {
        throw new Error("Get Bans query Error: " + error.message)
    }
} 

const getTableById = async (id) => {
    const sql = "SELECT * FROM ban WHERE ma_ban = ?";

    try {
        // Return undefine if id not exists
        const [result] = await pool.execute(sql, [id]);

        return result[0];
    } catch (error) {
        throw new Error("Get Table By Id query Error: " + error.message)
    }
}

const getNumberOfTable = async () => {
    const sql = "select count(*) as soluong from ban";

    try {
        const [result] = await pool.query(sql);

        return result[0].soluong;
    } catch (error) {
        throw new Error("Get Number Of Table: " + error.message)
    }
}

module.exports = {
    getAllBans,
    getBans,
    getTableById,
    getNumberOfTable
}