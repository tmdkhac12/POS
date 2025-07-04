const pool = require('../configs/connection.js').promise();

const getCurrentOrdersByTable = async (tableId) => {
    const sql = "SELECT * FROM currentorder where ma_ban = ?";

    try {
        const [result] = await pool.execute(sql, [tableId]);
        return result;
    } catch (error) {
        throw new Error("Get Current Orders By Table (CurrentOrderModel): " + error.message)
    }
}

const insertOrder = async (dishId, tableId, price, quantity, note) => {
    const sql = `insert into currentorder(ma_mon_an, ma_ban, don_gia_ap_dung, so_luong, ghi_chu)
                values (?, ?, ?, ?, ?)`;

    try {
        const [result] = await pool.execute(sql, [dishId, tableId, price, quantity, note]);

        return result.affectedRows > 0;
    } catch (error) {
        throw new Error("Insert Order (CurrentOrderModel): " + error.message)
    }
}

const updateOrder = async (orderId, newQuantity, newNote) => {
    const sql = `update currentorder set so_luong = ?, ghi_chu = ?
                where ma_order = ?`;

    try {
        const [result] = await pool.execute(sql, [newQuantity, newNote, orderId]);

        return result.affectedRows > 0;
    } catch (error) {
        throw new Error("Update Order (CurrentOrderModel): " + error.message)
    }
}

const changeTable = async (oldTableId, newTableId) => {
    const sql = `update currentorder set ma_ban = ?
                where ma_ban = ?`;

    try {
        const [result] = await pool.execute(sql, [newTableId, oldTableId]);

        return result.affectedRows > 0;
    } catch (error) {
        throw new Error("Change Tale (CurrentOrderModel): " + error.message)
    }
}

const hardDeleteOrder = async (orderId) => {
    const sql = `delete from currentorder where ma_order = ?`;

    try {
        const [result] = await pool.execute(sql, [orderId]);

        return result.affectedRows > 0;
    } catch (error) {
        throw new Error("Delete Order (CurrentOrderModel): " + error.message)
    }
}

module.exports = {
    getCurrentOrdersByTable,
    insertOrder,
    updateOrder, changeTable,
    hardDeleteOrder
}