const currentOrderRouter = require('express').Router();
const currentOrderController = require('../../controller/api/CurrentOrderController.js');

currentOrderRouter.get("/:tableId", async (req, res) => {
    try {
        const tableId = req.params.tableId;

        const orders = await currentOrderController.getCurrentOrdersByTable(tableId);

        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error("GET Route: '/api/current-order/:tableId' - (CurrentOrderRouter): " + error.message);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
})

currentOrderRouter.post("/", async (req, res) => {
    try {
        const dishId = req.body.maMon;
        const tableId = req.body.maBan;
        const quantity = req.body.soLuong;
        const note = req.body.ghiChu || null;

        const isSuccess = await currentOrderController.addToCurrentOrder(dishId, tableId, quantity, note);
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
        const oldId = req.body.oldTableId;
        const newId = req.body.newTableId;

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