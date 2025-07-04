const currentOrderModel = require('../../models/CurrentOrderModel.js');
const monAnModel = require('../../models/MonAnModel.js'); 
const banModel = require('../../models/BanModel.js');

const getCurrentOrdersByTable = async (tableId) => {
    try {
        return await currentOrderModel.getCurrentOrdersByTable(tableId);
    } catch (error) {
        console.error("Get Current Orders By Table (CurrentOrderController): " + error.message);
        throw error;
    }
}

const addToCurrentOrder = async (dishId, tableId, quantity, note) => {
    try {
        const price = await monAnModel.getPrice(dishId);
        return await currentOrderModel.insertOrder(dishId, tableId, price, quantity, note);
    } catch (error) {
        console.error("Add To Current Order (CurrentOrderController): " + error.message);
        throw error;
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