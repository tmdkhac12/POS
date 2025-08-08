const khuyenMaiRouter = require('express').Router();
const khuyenMaiController = require('../../../controller/api/v1/KhuyenMaiController.js');

const validate = require('../../../middleware/KhuyenMaiMiddleware.js').validateKhuyenMai;

khuyenMaiRouter.get("/", async (req, res) => {
    // localhost:3000/api/khuyenmais?page=2
    try {
        const limit = 8;
        const offset = (req.query.page - 1) * limit;
        const name = req.query.search;
        const start = req.query.start ? req.query.start + " 00:00:00" : null;
        const end = req.query.end ? req.query.end + " 23:59:59" : null;

        // console.log({key, start, end});
        const khuyenMais = await khuyenMaiController.getPaginatedKhuyenMais(name, start, end, limit, offset);
        const total = await khuyenMaiController.countKhuyenMai(name, start, end);

        res.status(200).send({ success: true, khuyenMais, total });
    } catch (error) {
        console.error("Route: '/api/khuyenMais?query' - (KhuyenMaiRouter): " + error.message);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
})

khuyenMaiRouter.post("/", validate, async (req, res) => {
    try {
        const name = req.body.name;
        const percent = parseInt(req.body.percent) ? parseInt(req.body.percent) : null;
        const money = parseFloat(req.body.money) ? parseFloat(req.body.money) : null;
        const start = req.body.start + " 00:00:00";
        const end = req.body.end + " 23:59:59";

        // console.log({ name, percent, money, start, end });
        const isSuccess = await khuyenMaiController.addKhuyenMai(name, percent, money, start, end);
        const numberOfKhuyenMais = await khuyenMaiController.countKhuyenMai();

        if (isSuccess) {
            res.status(200).json({ success: true, message: "Thêm khuyến mãi thành công!", numberOfKhuyenMais });
        } else {
            res.status(400).json({ success: false, message: "Thêm khuyến mãi thất bại!" });
        }
    } catch (error) {
        console.error("POST Route: '/api/khuyenmais' - (KhuyenMaiRouter): " + error.message);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
})

khuyenMaiRouter.put("/:id", validate, async (req, res) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const percent = parseInt(req.body.percent) ? parseInt(req.body.percent) : null;
        const money = parseFloat(req.body.money) ? parseFloat(req.body.money) : null;
        const start = req.body.start + " 00:00:00";
        const end = req.body.end + " 23:59:59";
        const option = req.body.option;

        const isSuccess = await khuyenMaiController.updateKhuyenMai(name, percent, money, start, end, id, option);

        if (isSuccess) {
            res.status(200).json({ success: true, message: "Sửa khuyến mãi thành công!" });
        } else {
            res.status(400).json({ success: false, message: "Sửa khuyến mãi thất bại!" });
        }
    } catch (error) {
        console.error("PUT Route: '/api/khuyenmais/:id' - (KhuyenMaiRouter): " + error.message);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
})

khuyenMaiRouter.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const isSuccess = await khuyenMaiController.deleteKhuyenMai(id);
        const numberOfKhuyenMais = await khuyenMaiController.countKhuyenMai();

        if (isSuccess) {
            res.status(200).json({ success: true, message: "Xóa khuyến mãi thành công!", numberOfKhuyenMais });
        } else {
            res.status(400).json({ success: false, message: "Xóa khuyến mãi thất bại!" });
        }
    } catch (error) {
        console.error("DELETE Route: '/api/khuyenmais/:id' - (KhuyenMaiRouter): " + error.message);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
})


module.exports = khuyenMaiRouter;