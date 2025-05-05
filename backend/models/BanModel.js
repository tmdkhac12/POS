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

const getNumberOfTable = async () => { 
    const sql = "SELECT COUNT(*) as quantity FROM BAN"

    try {
        const [result] = await pool.query(sql);
        let quantity = result[0].quantity;

        return quantity;
    } catch (error) {
        throw new Error("Get Number of Ban query Error: " + error.message)
    }
}

module.exports = {
    getAllBans,
    getNumberOfTable
}