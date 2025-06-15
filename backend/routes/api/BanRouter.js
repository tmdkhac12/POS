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
        console.error("GET Route: '/api/bans?query' - (BanRouter): " + error.message);
        res.status(500).json({success: false, message: "Lỗi Server"});
    }
})

banRouter.post("/", async (req, res) => {
    try {
        const body = req.body;

        const isSuccess = await banController.addBan(body.name);
        const numberOfBans = await banController.countBans();

        if (isSuccess) {
            res.status(200).json({success: true, message: "Thêm bàn thành công!", numberOfBans});
        } else {
            res.status(200).json({success: false, message: "Thêm bàn thất bại!"});
        }
    } catch (error) {
        console.error("POST Route: '/api/bans' - (BanRouter): " + error.message);
        res.status(500).json({success: false, message: "Lỗi Server"});
    }
})

banRouter.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { newName } = req.body;

        const isSuccess = await banController.updateBan(newName, id);

        if (isSuccess) {
            res.status(200).json({success: true, message: "Sửa thông tin bàn thành công!"});
        } else {
            res.status(200).json({success: false, message: "Sửa thông tin bàn bàn thất bại!"});
        }
    } catch (error) {
        console.error("PUT Route: '/api/bans/:id' - (BanRouter): " + error.message);
        res.status(500).json({success: false, message: "Lỗi Server"});   
    }
})

banRouter.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const isSuccess = await banController.deleteBan(id);
        const numberOfBans = await banController.countBans();

        if (isSuccess) {
            res.status(200).json({success: true, message: "Xóa bàn thành công!", numberOfBans});
        } else {
            res.status(200).json({success: false, message: "Xóa bàn bàn thất bại!"});
        }
    } catch (error) {
        console.error("DELETE Route: '/api/bans/:id' - (BanRouter): " + error.message);
        res.status(500).json({success: false, message: "Lỗi Server"});   
    }  
})

module.exports = banRouter;