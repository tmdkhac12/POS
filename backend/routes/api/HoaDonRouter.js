const hoaDonRouter = require("express").Router();
const hoaDonController = require('../../controller/api/HoaDonController.js');

hoaDonRouter.get("/", async (req, res) => {
    // localhost:3000/api/hoadons?page=2
    try {
        const limit = 8;
        const offset = (req.query.page - 1) * limit;
        const key = req.query.search;
        const start = req.query.start ? req.query.start + " 00:00:00" : null;
        const end = req.query.end ? req.query.end + " 23:59:59" : null;

        // console.log({key, start, end});

        const hoaDons = await hoaDonController.getPaginatedHoaDons(key, start, end, limit, offset);
        const total = await hoaDonController.countHoaDon(key, start, end);
        
        res.status(200).json({success: true, hoaDons, total});
    } catch (error) {
        console.error("GET Route: '/api/hoadons?query' - (HoaDonRouter): " + error.message);
        res.status(500).json({success: false, message: "Lỗi Server"});
    }
})

hoaDonRouter.get("/invoice-details/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const data = await hoaDonController.viewHoaDon(id);

        res.status(200).json({success: true, hoaDon: data.hoaDon, chiTiets: data.chiTiets });
        
    } catch (error) {
        console.error("GET Route: '/api/hoadons/invoice-details/:id' - (HoaDonRouter): " + error.message);
        res.status(500).json({success: false, message: "Lỗi Server"});
    }
})

module.exports = hoaDonRouter;