const pool = require("../configs/connection").promise();

const getAllBans = async () => {
    const sql = "SELECT * FROM BAN where is_deleted = 0";
    
    try {
        const [result] = await pool.query(sql);
        return result;
    } catch (error) {
        throw new Error("Get All Ban (BanModel): " + error.message)
    }
}

const getBans = async (limit, offset) => {
    const sql = "SELECT * FROM ban where is_deleted = 0 LIMIT ? OFFSET ?";

    try {
        const [result] = await pool.execute(sql, [limit, offset]);
        return result;
    } catch (error) {
        throw new Error("Get Bans (BanModel): " + error.message)
    }
} 

const getEmptyTable = async () => {
    const sql = `SELECT DISTINCT b.ma_ban, b.ten_ban 
                FROM currentorder c 
                RIGHT JOIN ban b ON c.ma_ban = b.ma_ban 
                WHERE b.is_deleted = 0 and ma_order IS NULL`;
    
    try {
        const [result] = await pool.query(sql);
        return result;
    } catch (error) {
        throw new Error("Get Empty Table (BanModel): " + error.message)
    }
}

const getTableById = async (id) => {
    const sql = "SELECT * FROM ban WHERE ma_ban = ? and is_deleted = 0";

    try {
        // Return undefine if id not exists
        const [result] = await pool.execute(sql, [id]);

        return result[0];
    } catch (error) {
        throw new Error("Get Table By Id (BanModel): " + error.message)
    }
}

const getNumberOfTable = async (name) => {
    const sql = "select count(*) as soluong from ban where ten_ban like ? and is_deleted = 0";

    try {
        const [result] = await pool.execute(sql, [`%${name}%`]);

        return result[0].soluong;
    } catch (error) {
        throw new Error("Get Number Of Table (BanModel): " + error.message)
    }
}

const searchBan = async (name, limit, offset) => {
    const sql = "select * from ban where ten_ban like ? and is_deleted = 0 LIMIT ? OFFSET ?";

    try {
        const [result] = await pool.execute(sql, [`%${name}%`, limit, offset]);
        return result;
    } catch (error) {
        throw new Error("Search Ban (BanModel): " + error.message)
    }
}

const insertTable = async (name) => {
    const sql = "insert into ban(ten_ban) values(?)";

    try {
        const [result] = await pool.execute(sql, [name]);

        return result.affectedRows > 0;
    } catch (error) {
        throw new Error("Insert Table (BanModel): " + error.message)
    }
}

const updateTable = async (name, id) => {
    const sql = "update ban set ten_ban = ? where ma_ban = ?";

    try {
        const [result] = await pool.execute(sql, [name, id]);

        return result.affectedRows > 0;
    } catch (error) {
        throw new Error("Update Table (BanModel): " + error.message)
    }
}

const updateTableStatus = async (status, id) => {
    const sql = "update ban set trang_thai = ? where ma_ban = ?";

    try {
        const [result] = await pool.execute(sql, [status, id]);

        return result.affectedRows > 0;
    } catch (error) {
        throw new Error("Update Table Status (BanModel): " + error.message)
    }
}

const softDeleteBan = async (id) => {
    const sql = "update ban set is_deleted = 1 where ma_ban = ?";

    try {
        const [result] = await pool.execute(sql, [id]);

        return result.affectedRows > 0;
    } catch (error) {
        throw new Error("Soft Delete Table (BanModel): " + error.message)
    }
}

module.exports = {
    getAllBans, getBans, getTableById, getNumberOfTable, getEmptyTable,
    insertTable,
    updateTable, updateTableStatus,
    softDeleteBan,
    searchBan
}