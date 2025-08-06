const currentOrderRouter = require('express').Router();
const currentOrderController = require('../../controller/api/CurrentOrderController.js');

currentOrderRouter.get("/occupied-table-orders-status", async (req, res) => {
    try {
        const results = await currentOrderController.getOccupiedTableOrdersStatus();

        res.status(200).json({ success: true, results});
    } catch (error) {
        console.error("GET Route: '/api/current-order/occupied-table-orders' - (CurrentOrderRouter): " + error.message);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
})


currentOrderRouter.get("/table/:tableId", async (req, res) => {
    try {
        const tableId = req.params.tableId;

        const orders = await currentOrderController.getCurrentOrdersByTable(tableId);

        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error("GET Route: '/api/current-order/table/:tableId' - (CurrentOrderRouter): " + error.message);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
})

currentOrderRouter.post("/", async (req, res) => {
    try {
        const tableId = req.body.maBan;
        const orders = req.body.orders;

        const isSuccess = await currentOrderController.addToCurrentOrder(tableId, orders);
        if (isSuccess) {
            res.status(200).json({ success: true });
        } else {
            res.status(400).json({ success: false, message: "Thêm món ăn vào đơn hàng thất bại!" });
        }
    } catch (error) {
        console.error("POST Route: '/api/current-order/' - (CurrentOrderRouter): " + error.message);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
})

currentOrderRouter.put("/:orderId", async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const newQuantity = req.body.newQuantity;
        const newNote = req.body.newNote || null;

        const isSuccess = await currentOrderController.updateCurrentOrder(orderId, newQuantity, newNote);
        if (isSuccess) {
            res.status(200).json({ success: true });
        } else {
            res.status(400).json({ success: false, message: "Sửa món ăn không thành công!" });
        }

    } catch (error) {
        console.error("PUT Route: '/api/current-order/:orderId' - (CurrentOrderRouter): " + error.message);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
})

currentOrderRouter.patch("/move-table", async (req, res) => {
    try {
        const oldId = parseInt(req.body.oldTableId);
        const newId = parseInt(req.body.newTableId);

        if (newId === 0) {
            return res.status(400).json({ success: false, message: "Vui lòng chọn bàn mới!" });
        }

        const isSuccess = await currentOrderController.changeTable(oldId, newId);
        if (isSuccess) {
            res.status(200).json({ success: true, message: "Chuyển bàn thành công!" });
        } else {
            res.status(400).json({ success: false, message: "Chuyển bàn không thành công!" });
        }
        
    } catch (error) {
        console.error("PATCH Route: '/api/current-order/move-table' - (CurrentOrderRouter): " + error.message);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
})

currentOrderRouter.patch("/status", async (req, res) => {
    try {
        const orders = req.body.orders;

        const isSuccess = await currentOrderController.updateOrdersStatus(orders);

        if (isSuccess) {
            res.status(200).json({ success: true });
        } else {
            res.status(400).json({ success: false, message: "Cập nhật trạng thái món ăn thất bại!" });
        }
        
    } catch (error) {
        console.error("PATCH Route: '/api/current-order/status' - (CurrentOrderRouter): " + error.message);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
})

currentOrderRouter.delete("/:orderId", async (req, res) => {
    try {
        const orderId = req.params.orderId;

        const isSuccess = await currentOrderController.deleteCurrentOrder(orderId);
        if (isSuccess) {
            res.status(200).json({ success: true });
        } else {
            res.status(400).json({ success: false, message: "Xóa món ăn không thành công!" });
        }

    } catch (error) {
        console.error("DELETE Route: '/api/current-order/:orderId' - (CurrentOrderRouter): " + error.message);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
})

module.exports = currentOrderRouter;