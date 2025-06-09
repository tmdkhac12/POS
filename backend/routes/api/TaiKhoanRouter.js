const taiKhoanRouter = require("express").Router();
const taiKhoanController = require('../../controller/api/TaiKhoanController.js');

taiKhoanRouter.get("/", async (req, res) => {
    // localhost:3000/api/taikhoans?page=2
    try {
        const limit = 8;
        const offset = (req.query.page - 1) * limit;
        
        const taiKhoans = await taiKhoanController.getPaginatedTaiKhoans(limit, offset);
    
        res.status(200).json({success: true, taiKhoans});
    } catch (error) {
        console.error("Route: '/api/taikhoans?query' - (TaiKhoanRouter): " + error.message);
        res.status(500).json({success: false, message: "Lỗi Server"});
    }
})

module.exports = taiKhoanRouter;