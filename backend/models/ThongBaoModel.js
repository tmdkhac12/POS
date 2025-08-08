const pool = require('../configs/connection.js').promise();

const getAllNotifications = async () => {
    const sql = "SELECT * FROM thongbao";
    
    try {
        const [result] = await pool.query(sql);
        return result;
    } catch (error) {
        throw new Error("Get All Notificatons (ThongBaoModel): " + error.message)
    }
}

const getNotifications = async (limit, offset) => {
    const sql = "SELECT * FROM thongbao ORDER BY thoi_gian_tao DESC LIMIT ? OFFSET ?";

    try {
        const [result] = await pool.execute(sql, [limit, offset]);
        return result;
    } catch (error) {
        throw new Error("Get Notificatons (ThongBaoModel): " + error.message)
    }
}

const getNotificationById = async (id) => {
    const sql = "SELECT * FROM thongbao WHERE ma_thong_bao = ?";

    try {
        const [result] = await pool.execute(sql, [id]);

        return result[0];
    } catch (error) {
        throw new Error("Get Notifications By ID (ThongBaoModel): " + error.message);
    }
}

const createNotification = async (tableId, content, status, category) => {
    const sql = "INSERT INTO thongbao (ma_ban, noi_dung, trang_thai, phan_loai) VALUES (?, ?, ?, ?)";

    try {
        const [result] = await pool.execute(sql, [tableId, content, status, category]);
        return result.insertId;
    } catch (error) {
        throw new Error("Create Notification (ThongBaoModel): " + error.message);
    }
}

const createUnreadNotification = async (tableId, content, category) => {
    const sql = "INSERT INTO thongbao (ma_ban, noi_dung, trang_thai, phan_loai) VALUES (?, ?, ?, ?)";

    try {
        const [result] = await pool.execute(sql, [tableId, content, 0, category]);
        return result.insertId;
    } catch (error) {
        throw new Error("Create Notification (ThongBaoModel): " + error.message);
    }
}

const updateStatusAsRead = async (id) => {
    const sql = "UPDATE thongbao SET trang_thai = 1 WHERE ma_thong_bao = ?";

    try {
        const [result] = await pool.execute(sql, [id]);
        
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error("Update Status As Read (ThongBaoModel): " + error.message);
    }
}

module.exports = {
    getAllNotifications, getNotifications, getNotificationById,
    createNotification, createUnreadNotification,
    updateStatusAsRead
}