const khuyenMaiRouter = require('express').Router();
const khuyenMaiController = require('../../controller/api/KhuyenMaiController.js');

khuyenMaiRouter.get("/", async (req, res) => {
    // localhost:3000/api/khuyenmais?page=2
    try {
        const limit = 8;
        const offset = (req.query.page - 1) * limit;

        const khuyenMais = await khuyenMaiController.getPaginatedKhuyenMais(limit, offset);

        res.status(200).send({success: true, khuyenMais});
    } catch (error) {
        console.error("Route: '/api/khuyenMais?query' - (KhuyenMaiRouter): " + error.message);
        res.status(500).json({success: false, message: "Lỗi Server"});
    }
})

module.exports = khuyenMaiRouter;