const monAnRouter = require('express').Router();
const monAnController = require('../../controller/api/MonAnController.js');

monAnRouter.get("/", async (req, res) => {
    // localhost:3000/api/monans?page=2
    try {
        const limit = 8;
        const offset = (req.query.page - 1) * limit;

        const monAns = await monAnController.getPaginatedMonAns(limit, offset);

        res.status(200).json({success: true, monAns});
    } catch (error) {
        console.error("Route: '/api/monans?query' - (MonAnRouter): " + error.message);
        res.status(500).json({success: false, message: "Lỗi Server"});
    }
});

module.exports = monAnRouter;