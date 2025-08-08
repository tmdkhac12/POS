const khachHangRouter = require('express').Router();
const khachHangController = require('../../../controller/api/v1/KhachHangController.js');

const validateKhachHang = require("../../../middleware/KhachHangMiddleware.js").validateKhachHang;
const parser = require('../../../util/Parser.js');

khachHangRouter.get("/", async (req, res) => {
    // localhost:3000/api/khachangs?page=2
    try {
        const limit = 8;
        const offset = (req.query.page - 1) * limit;
        const search = req.query.search;

        const khachHangs = await khachHangController.getPaginatedKhachHangs(search, limit, offset);
        const total = await khachHangController.countKhachHang(search);

        res.status(200).send({ success: true, khachHangs, total });
    } catch (error) {
        console.error("Route: '/api/khachhangs?query' - (KhachHangRouter): " + error.message);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
})

khachHangRouter.get("/phone/:phoneNumber", async (req, res) => {
    try {
        const phone = req.params.phoneNumber;
        const khachHang = await khachHangController.getKhachHangByPhoneNumber(phone);

        res.status(200).json({ success: true, khachHang });
    } catch (error) {
        console.error("GET Route: '/api/khachhangs/phone/:phoneNumber' - (KhachHangRouter): " + error.message);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
})

khachHangRouter.post("/", validateKhachHang, async (req, res) => {
    try {
        const name = req.body.name;
        const phone = req.body.phone;
        const total = parseFloat(req.body.total) ? parseFloat(req.body.total) : 0;
        const accu = parseFloat(req.body.accu) ? parseFloat(req.body.accu) : 0;
        const rank = parser.parseRank(req.body.rank);

        // console.log({name, phone, total, accu, rank});

        const isSuccess = await khachHangController.addKhachHang(name, phone, total, accu, rank);
        const numberOfKhachHangs = await khachHangController.countKhachHang();

        if (isSuccess) {
            res.status(200).json({ success: true, message: "Thêm khách hàng thành công!", numberOfKhachHangs });
        } else {
            res.status(400).json({ success: false, message: "Thêm khách hàng thất bại!" });
        }

    } catch (error) {
        console.error("POST Route: '/api/khachhangs' - (KhachHangRouter): " + error.message);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
})

khachHangRouter.put("/:id", validateKhachHang, async (req, res) => {
    try {
        const id = req.params.id;

        const name = req.body.name;
        const phone = req.body.phone;
        const total = parseFloat(req.body.total) ? parseFloat(req.body.total) : 0;
        const accu = parseFloat(req.body.accu) ? parseFloat(req.body.accu) : 0;
        const rank = parser.parseRank(req.body.rank);

        const isSuccess = await khachHangController.updateKhachHang(name, phone, total, accu, rank, id);
        const numberOfKhachHangs = await khachHangController.countKhachHang();

        if (isSuccess) {
            res.status(200).json({ success: true, message: "Sửa thông tin khách hàng thành công!", numberOfKhachHangs });
        } else {
            res.status(400).json({ success: false, message: "Sửa thông tin khách hàng thất bại!" });
        }

    } catch (error) {
        console.error("PUT Route: '/api/khachhangs/:id' - (KhachHangRouter): " + error.message);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
})

khachHangRouter.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const isSuccess = await khachHangController.deleteKhachHang(id);
        const numberOfKhachHangs = await khachHangController.countKhachHang();

        if (isSuccess) {
            res.status(200).json({ success: true, message: "Xóa khách hàng thành công!", numberOfKhachHangs });
        } else {
            res.status(400).json({ success: false, message: "Xóa khách hàng thất bại!" });
        }

    } catch (error) {
        console.error("DELETE Route: '/api/khachhangs/:id' - (KhachHangRouter): " + error.message);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
})

module.exports = khachHangRouter;