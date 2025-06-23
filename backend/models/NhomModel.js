const pool = require("../configs/connection").promise();

const getAllNhoms = async () => {
    const sql = "SELECT * FROM nhom where is_deleted = 0";

    try {
        const [result] = await pool.query(sql);

        return result;
    } catch (error) {
        throw new Error("Get All Nhoms (NhomModel): " + error.message);
    }
}

const getNhoms = async (limit, offset) => {
    const sql = "select * from nhom where is_deleted = 0 limit ? offset ?";

    try {
        const [result] = await pool.execute(sql, [limit, offset]);

        return result;
    } catch (error) {
        throw new Error("Get Nhoms Limit Offset (NhomModel): " + error.message);
    }
}

const searchNhoms = async (name, limit, offset) => {
    const sql = "select * from nhom where ten_nhom like ? and is_deleted = 0 limit ? offset ?";

    try {
        const [result] = await pool.execute(sql, [`%${name}%`, limit, offset]);

        return result;
    } catch (error) {
        throw new Error("Search Nhoms Limit Offset (NhomModel): " + error.message);
    }
}

const getNumberOfNhoms = async function (name) {
    const sql = "select count(*) as soluong from nhom where ten_nhom like ? and is_deleted = 0";

    try {
        const [result] = await pool.execute(sql, [`%${name}%`]);

        return result[0].soluong;
    } catch (error) {
        throw new Error("Get Number of Nhoms (NhomModel): " + error.message);
    }
}

const insertNhom = async (categoryName, imageName) => {
    const sql = "insert into nhom(ten_nhom, hinh_anh) values (?,?)";

    try {
        const [result] = await pool.query(sql, [categoryName, imageName]);

        return result.affectedRows > 0;
    } catch (error) {
        throw new Error("Insert Nhom (NhomModel): " + error.message);
    }
}

const updateNhom = async(categoryName, imageName, id) => {
    const sql = "update nhom set ten_nhom = ?, hinh_anh = ? where ma_nhom = ?";

    try {
        const [result] = await pool.query(sql, [categoryName, imageName, id]);

        return result.affectedRows > 0;
    } catch (error) {
        throw new Error("Update Nhom (NhomModel): " + error.message);
    }   
}

const updateNameNhom = async(categoryName, id) => {
    const sql = "update nhom set ten_nhom = ? where ma_nhom = ?";

    try {
        const [result] = await pool.query(sql, [categoryName, id]);

        return result.affectedRows > 0;
    } catch (error) {
        throw new Error("Update Nhom (NhomModel): " + error.message);
    }   
}

const softDeleteNhom = async (id) => {
    const sql = "update nhom set is_deleted = 1 where ma_nhom = ?";

    try {
        const [result] = await pool.query(sql, [id]);

        return result.affectedRows > 0;
    } catch (error) {
        throw new Error("Soft Delete Nhom (NhomModel): " + error.message);
    }
}

module.exports = {
    getAllNhoms, getNhoms, getNumberOfNhoms,
    insertNhom,
    updateNhom, updateNameNhom,
    softDeleteNhom,
    searchNhoms
}