const banModel = require('../../../models/BanModel.js');
const thongBaoModel = require('../../../models/ThongBaoModel.js');

const thongBaoUtil = require('../../../util/NotificationUtil.js');

const getNotifications = async (limit, offset) => {
    try {
        return await thongBaoModel.getNotifications(limit, offset);
    } catch (error) {
        console.error("Get Notifications (ThongBaoController): " + error.message);
        throw error;
    }
}

const getNotificationById = async (id) => {
    try {
        return await thongBaoModel.getNotificationById(id);
    } catch (error) {
        console.error("Get Notification By ID (ThongBaoController): " + error.message);
        throw error;
    }
}

const createNotification = async (tableId, category) => {
    try {
        // Check if the table exists
        const table = await banModel.getTableById(tableId);
        if (!table) {
            throw new Error("Table not found");
        }
        const tableName = table.ten_ban;

        let content = thongBaoUtil.getNotificationMessage(category, tableName);
        const status = 0; // Unread

        return await thongBaoModel.createNotification(tableId, content, status, category);
    } catch (error) {
        console.error("Create Notification (ThongBaoController): " + error.message);
        throw error;
    }
}

const updateNotificationStatus = async (id) => {
    try {
        return await thongBaoModel.updateStatusAsRead(id);
    } catch (error) {
        console.error("Update Notification Status (ThongBaoController): " + error.message);
        throw error;
    }
}

module.exports = {
    getNotificationById, getNotifications,
    createNotification,
    updateNotificationStatus
};