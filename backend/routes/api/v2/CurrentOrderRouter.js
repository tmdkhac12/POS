const currentOrderRouter = require('express').Router();
const currentOrderController = require('../../../controller/api/v2/CurrentOrderController.js');

currentOrderRouter.post("/place-orders", async (req, res) => {
    try {
        const tableId = req.body.maBan;
        const orders = req.body.orders;
        const category = req.body.category;

        const notificationId = await currentOrderController.placeOrdersAndNotify(tableId, orders, category);
        if (notificationId) {
            res.status(200).json({ success: true, notificationId });
        } else {
            res.status(400).json({ success: false, message: "Thêm món ăn vào đơn hàng thất bại!" });
        }
    } catch (error) {
        console.error("POST Route: '/api/v2/current-order/place-orders' - (CurrentOrderRouter): " + error.message);
        res.status(500).json({ success: false, message: "Lỗi Server, không thể thực hiện thao tác đặt món" });
    }
});

module.exports = currentOrderRouter