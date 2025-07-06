const currentOrderModel = require('../../models/CurrentOrderModel.js');
const monAnModel = require('../../models/MonAnModel.js'); 
const banModel = require('../../models/BanModel.js');

const pool = require('../../configs/connection.js').promise();

const getCurrentOrdersByTable = async (tableId) => {
    try {
        return await currentOrderModel.getCurrentOrdersByTable(tableId);
    } catch (error) {
        console.error("Get Current Orders By Table (CurrentOrderController): " + error.message);
        throw error;
    }
}

const addToCurrentOrder = async (tableId, orders) => {
    const conn = await pool.getConnection();
    
    try {
        await conn.beginTransaction();

        for (const order of orders) {
            const dishId = order.maMon;
            const quantity = order.soLuong;
            const note = order.ghiChu;

            const price = await monAnModel.getPrice(dishId);
            const isSuccess =  await currentOrderModel.insertOrder(dishId, tableId, price, quantity, note, conn);

            if (!isSuccess) {
                throw new Error("Thêm món ăn thất bại");
            }
        }

        await conn.commit();
        return true;
    } catch (error) {
        console.error("Add To Current Order (CurrentOrderController): " + error.message);
        await conn.rollback();
        return false;
    } finally {
        conn.release();
    }
}

const updateCurrentOrder = async (orderId, newQuantity, newNote) => {
    try {
        return await currentOrderModel.updateOrder(orderId, newQuantity, newNote);
    } catch (error) {
        console.error("Update Current Order (CurrentOrderController): " + error.message);
        throw error;
    }
}

const changeTable = async (oldTableId, newTableId) => {
    try {
        const changeTableSuccess = await currentOrderModel.changeTable(oldTableId, newTableId);
        const updateOldTableStatusSuccess = await banModel.updateTableStatus("Có khách", newTableId);
        const updateNewTableStatusSuccess = await banModel.updateTableStatus("Trống", oldTableId);

        return changeTableSuccess && updateOldTableStatusSuccess && updateNewTableStatusSuccess;
    } catch (error) {
        console.error("Chage Table (CurrentOrderController): " + error.message);
        throw error;
    }
}

const deleteCurrentOrder = async (orderId) => {
    try {
        return await currentOrderModel.hardDeleteOrder(orderId);
    } catch (error) {
        console.error("Delete Current Order (CurrentOrderController): " + error.message);
        throw error;
    }
}

module.exports = {
    getCurrentOrdersByTable,
    addToCurrentOrder,
    updateCurrentOrder, changeTable,
    deleteCurrentOrder
}