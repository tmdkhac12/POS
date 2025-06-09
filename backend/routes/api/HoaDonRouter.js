const hoaDonRouter = require("express").Router();
const hoaDonController = require('../../controller/api/HoaDonController.js');

hoaDonRouter.get("/", async (req, res) => {
    // localhost:3000/api/hoadons?page=2
    try {
        const limit = 8;
        const offset = (req.query.page - 1) * limit;
        
        const hoaDons = await hoaDonController.getPaginatedHoaDons(limit, offset);
    
        res.status(200).json({success: true, hoaDons});
    } catch (error) {
        console.error("Route: '/api/hoadons?query' - (HoaDonRouter): " + error.message);
        res.status(500).json({success: false, message: "Lỗi Server"});
    }
})

module.exports = hoaDonRouter;