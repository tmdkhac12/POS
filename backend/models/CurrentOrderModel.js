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

const getCurrentOrdersByTableJoinDish = async (tableId) => {
    const sql = `SELECT c.*, m.ten_mon_an, m.hinh_anh FROM currentorder c
                INNER JOIN monan m ON c.ma_mon_an = m.ma_mon_an
                WHERE c.ma_ban = ?`;

    try {
        const [result] = await pool.execute(sql, [tableId]);
        return result;
    } catch (error) {
        throw new Error("Get Current Orders By Table Join Dish (CurrentOrderModel): " + error.message)
    }
}

const getCurrentOrdersStatusByTable = async (tableId) => {
    const sql = "SELECT ma_order, trang_thai FROM currentorder where ma_ban = ?";

    try {
        const [result] = await pool.execute(sql, [tableId]);
        return result;
    } catch (error) {
        throw new Error("Get Current Orders Status By Table (CurrentOrderModel): " + error.message)
    }
}

const insertOrder = async (dishId, tableId, price, quantity, note, conn = pool) => {
    const sql = `insert into currentorder(ma_mon_an, ma_ban, don_gia_ap_dung, so_luong, ghi_chu)
                values (?, ?, ?, ?, ?)`;

    try {
        const [result] = await conn.execute(sql, [dishId, tableId, price, quantity, note]);

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

const updateOrderStatus = async (orderId, status, conn = pool) => {
    const sql = `update currentorder set trang_thai = ?
                where ma_order = ?`;

    try {
        const [result] = await conn.execute(sql, [status, orderId]);

        return result.affectedRows > 0;
    } catch (error) {
        throw new Error("Update Order Status (CurrentOrderModel): " + error.message)
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

const hardDeleteOrderByTable = async (tableId, conn = pool) => {
    const sql = `delete from currentorder where ma_ban = ?`;

    try {
        const [result] = await conn.execute(sql, [tableId]);

        return result.affectedRows > 0;
    } catch (error) {
        throw new Error("Delete Order By Table (CurrentOrderModel): " + error.message)
    }
}

module.exports = {
    getCurrentOrdersByTable, getCurrentOrdersStatusByTable, getCurrentOrdersByTableJoinDish,
    insertOrder,
    updateOrder, updateOrderStatus, changeTable,
    hardDeleteOrder, hardDeleteOrderByTable
}