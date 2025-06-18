const monAnRouter = require('express').Router();
const monAnController = require('../../controller/api/MonAnController.js');

const upload = require('../../util/UploadImage.js').uploadMonAn;
const { validate } = require('../../middleware/MonAnMiddleware.js');

monAnRouter.get("/", async (req, res) => {
    // localhost:3000/api/monans?page=2
    try {
        const limit = 8;
        const offset = (req.query.page - 1) * limit;

        const monAns = await monAnController.getPaginatedMonAns(limit, offset);

        res.status(200).json({ success: true, monAns });
    } catch (error) {
        console.error("Route: '/api/monans?query' - (MonAnRouter): " + error.message);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
});

monAnRouter.post("/", upload.single("image"), validate, async (req, res) => {
    try {
        const name = req.body.name;
        const price = parseFloat(req.body.price) ? parseFloat(req.body.price) : 0;
        const categoryId = req.body.categoryId;
        const discountId = req.body.discountId != 0 ? req.body.discountId : null;
        const fileName = req.file ? req.file.filename : null;

        // console.log({name, price, categoryId, discountId, fileName});

        const isSuccess = await monAnController.addMonAn(name, price, categoryId, discountId, fileName);
        const numberOfMonAns = await monAnController.coutnMonAn();

        if (isSuccess) {
            res.status(200).json({ success: true, message: "Thêm món ăn thành công!", numberOfMonAns });
        } else {
            res.status(400).json({ success: false, message: "Thêm món ăn thất bại!" });
        }

    } catch (error) {
        console.error("POST Route: '/api/monans' - (MonAnRouter): " + error.message);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
})

monAnRouter.put("/:id", upload.single("image"), validate, async (req, res) => {
    try {
        const id = req.params.id;

        const name = req.body.name;
        const price = parseFloat(req.body.price) ? parseFloat(req.body.price) : 0;
        const categoryId = req.body.categoryId;
        const discountId = req.body.discountId != 0 ? req.body.discountId : null;

        const fileName = req.file ? req.file.filename : null;
        let isSuccess;

        // console.log({name, price, categoryId, discountId, fileName, id});

        if (fileName) {
            isSuccess = await monAnController.updateFull(name, price, categoryId, discountId, fileName, id);
        } else {
            isSuccess = await monAnController.updateWithoutImage(name, price, categoryId, discountId, id);
        }

        if (isSuccess) {
            res.status(200).json({ success: true, message: "Sửa thông tin món ăn thành công!" });
        } else {
            res.status(400).json({ success: false, message: "Sửa thông tin món ăn thất bại!" });
        }

    } catch (error) {
        console.error("PUT Route: '/api/monans/:id' - (MonAnRouter): " + error.message);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
})

monAnRouter.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const isSuccess = await monAnController.deleteMonAn(id);
        const numberOfMonAns = await monAnController.coutnMonAn();

        if (isSuccess) {
            res.status(200).json({ success: true, message: "Xóa món ăn thành công!", numberOfMonAns });
        } else {
            res.status(200).json({ success: false, message: "Xóa món ăn thất bại!" });
        }
    } catch (error) {
        console.error("DELETE Route: '/api/monans/:id' - (MonAnRouter): " + error.message);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
})

module.exports = monAnRouter;