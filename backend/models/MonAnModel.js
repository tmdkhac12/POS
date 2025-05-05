const pool = require("../configs/connection").promise()

const getAllDishes = async function () {
    const sql = "SELECT * FROM monan"

    try {
        const [result] = await pool.query(sql);
        
        return result
    } catch (error) {
        throw new Error("Get All Dishes query Error: " + error.message)
    }
}


module.exports = { 
    getAllDishes
}