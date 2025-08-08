const thongBaoRouter = require('express').Router();
const thongBaoController = require('../../../controller/api/v1/ThongBaoController.js');

thongBaoRouter.get("/", async (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    try {
        const notifications = await thongBaoController.getNotifications(limit, offset);

        res.status(200).json({ success: true, notifications });
    } catch (error) {
        console.error("GET Router: '/api/notification?page=&limit=' - (ThongBaoRouter):", error);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
});

thongBaoRouter.get("/:id", async (req, res) => {
    const notificationId = req.params.id;

    try {
        const notification = await thongBaoController.getNotificationById(notificationId);

        if (notification) {
            res.status(200).json({ success: true, notification });
        } else {
            res.status(404).json({ success: false, message: "Thông báo không tồn tại" });
        }
    } catch (error) {
        console.error("GET Router: '/api/notification/:id' - (ThongBaoRouter):", error);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
});

thongBaoRouter.post("/", async (req, res) => {
    const tableId = req.body.tableId;
    const category = req.body.category;

    try {
        // Create a new notification in the database
        const insertedId = await thongBaoController.createNotification(tableId, category);

        if (insertedId) {
            res.status(201).json({ success: true, insertedId });
        } else {
            res.status(400).json({ success: false, message: "Failed to create notification" });
        }
    } catch (error) {
        console.error("POST Router: '/api/notification' - (ThongBaoRouter):", error);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
});

thongBaoRouter.patch("/status/:id", async (req, res) => {
    const id = req.params.id;

    try {
        // Update the status of the notification in the database
        const success = await thongBaoController.updateNotificationStatus(id);

        if (success) {
            res.status(200).json({ success: true });
        } else {
            res.status(404).json({ success: false, message: "Thông báo không tồn tại" });
        }
    } catch (error) {
        console.error("PATCH Router: '/api/notification/status/:id' - (ThongBaoRouter):", error);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
});

module.exports = thongBaoRouter;