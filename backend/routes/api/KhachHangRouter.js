const khachHangRouter = require('express').Router();
const khachHangController = require('../../controller/api/KhachHangController.js');

khachHangRouter.get("/", async (req, res) => {
    // localhost:3000/api/khachangs?page=2
    try {
        const limit = 8;
        const offset = (req.query.page - 1) * limit;

        const khachHangs = await khachHangController.getPaginatedKhachHangs(limit, offset);

        res.status(200).send({success: true, khachHangs});
    } catch (error) {
        console.error("Route: '/api/khachhangs?query' - (KhachHangRouter): " + error.message);
        res.status(500).json({success: false, message: "Lỗi Server"});
    }
})

module.exports = khachHangRouter;