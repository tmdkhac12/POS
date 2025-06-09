const pool = require("../configs/connection").promise()

const getAllDishes = async function () {
    const sql = "SELECT * FROM monan"

    try {
        const [result] = await pool.query(sql);
        return result;
    } catch (error) {
        throw new Error("Get All Dishes (MonAnModel): " + error.message)
    }
}

const getDishesByGroup = async (group_id) => {
    const sql = "SELECT * FROM monan WHERE ma_nhom = ?"

    try {
        const [result] = await pool.query(sql, [group_id]);
        return result;
    } catch (error) {
        throw new Error("Get Dishes By Group (MonAnModel): " + error.message)
    }
}

const getAllDishesJoinGroup = async function () {
    const sql = "SELECT * FROM monan INNER JOIN nhom ON monan.ma_nhom = nhom.ma_nhom";

    try {
        const [result] = await pool.execute(sql);
        return result;
    } catch (error) {
        throw new Error("Get All Dishes Join Group (MonAnModel): " + error.message)
    }
}

const getDishesJoinGroup = async (limit, offset) => {
    const sql = "SELECT * FROM monan INNER JOIN nhom ON monan.ma_nhom = nhom.ma_nhom LIMIT ? OFFSET ?";

    try {
        const [result] = await pool.execute(sql, [limit, offset]);
        return result;
    } catch (error) {
        throw new Error("Get Dishes Join Group (MonAnModel): " + error.message)
    }
}

const getNumberOfDishes = async () => {
    const sql = "select count(*) as soluong from monan";

    try {
        const [result] = await pool.query(sql);

        return result[0].soluong;
    } catch (error) {
        throw new Error("Get Number Of Dishes (MonAnModel): " + error.message)
    }
}

module.exports = { 
    getAllDishes,
    getDishesByGroup,
    getAllDishesJoinGroup,
    getDishesJoinGroup,
    getNumberOfDishes
}