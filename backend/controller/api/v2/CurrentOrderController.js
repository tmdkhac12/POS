const pool = require('../../../configs/connection.js').promise();

const currentOrderModel = require('../../../models/CurrentOrderModel.js');
const monAnModel = require('../../../models/MonAnModel.js');
const banModel = require('../../../models/BanModel.js');
const thongBaoModel = require('../../../models/ThongBaoModel.js');

const thongBaoUtil = require('../../../util/NotificationUtil.js');

const placeOrdersAndNotify = async (tableId, orders, category) => {
    const conn = await pool.getConnection();

    try {
        await conn.beginTransaction();

        // Check if table exists
        const table = await banModel.getTableById(tableId);
        if (!table) {
            throw new Error("Table not found");
        }

        // Insert Orders 
        for (const order of orders) {
            const dishId = order.maMon;
            const quantity = order.soLuong;
            const note = order.ghiChu;

            const price = await monAnModel.getPrice(dishId);
            const isSuccess = await currentOrderModel.insertOrder(dishId, tableId, price, quantity, note, conn);

            if (!isSuccess) {
                throw new Error("Lỗi khi gọi insertOrder");
            }
        }

        // Insert Notification 
        const tableName = table.ten_ban;
        const content = thongBaoUtil.getNotificationMessage(category, tableName);
        const insertedNotificationId = await thongBaoModel.createUnreadNotification(tableId, content, category);

        if (!insertedNotificationId) {
            throw new Error("Lỗi khi thêm thông báo!");
        }

        await conn.commit();
        return insertedNotificationId;
    } catch (error) {
        await conn.rollback();
        throw new Error("Add To Current Order (CurrentOrderController): " + error.message);
    } finally {
        conn.release();
    }
}

module.exports = {
    placeOrdersAndNotify
};