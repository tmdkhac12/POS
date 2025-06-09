const phanLoaiRouter = require('express').Router();
const phanLoaiController = require('../../controller/api/PhanLoaiController.js');

phanLoaiRouter.get("/", async (req, res) => {
    // localhost:3000/api/phanloais?page=2
    try {
        const limit = 8;
        const offset = (req.query.page - 1) * limit;

        const phanLoais = await phanLoaiController.getPaginatedPhanLoais(limit, offset);

        res.status(200).json({success: true, phanLoais});
    } catch (error) {
        console.error("Route: '/api/phanloais?query' - (PhanLoaiRouter): " + error.message);
        res.status(500).json({success: false, message: "Lỗi Server"});
    }
});

module.exports = phanLoaiRouter;