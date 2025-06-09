const banRouter = require("express").Router();
const banController = require('../../controller/api/BanController.js');

banRouter.get("/", async (req, res) => {
    // localhost:3000/api/bans?page=2
    try {
        const limit = 8;
        const offset = (req.query.page - 1) * limit;
        
        const bans = await banController.getPaginatedBans(limit, offset);
    
        res.status(200).json({success: true, bans});
    } catch (error) {
        console.error("Route: '/api/bans?query' - (BanRouter): " + error.message);
        res.status(500).json({success: false, message: "Lỗi Server"});
    }
})

module.exports = banRouter;