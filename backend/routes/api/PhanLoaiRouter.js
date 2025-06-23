const phanLoaiRouter = require('express').Router();
const phanLoaiController = require('../../controller/api/PhanLoaiController.js');

const upload = require("../../util/UploadImage.js").uploadPhanLoai;
const { validate } = require('../../middleware/PhanLoaiMiddleware.js');

phanLoaiRouter.get("/", async (req, res) => {
    // localhost:3000/api/phanloais?page=2&saerch=
    try {
        const limit = 8;
        const offset = (req.query.page - 1) * limit;
        const search = req.query.search;

        const phanLoais = await phanLoaiController.getPaginatedPhanLoais(search, limit, offset);
        const total = await phanLoaiController.countPhanLoai(search);

        res.status(200).json({ success: true, phanLoais, total });
    } catch (error) {
        console.error("GET Route: '/api/phanloais?query' - (PhanLoaiRouter): " + error.message);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
});

phanLoaiRouter.post("/", upload.single("image"), validate, async (req, res) => {
    try {
        // Lấy đối tượng body fetch và file
        const body = req.body;
        const file = req.file;

        // Lấy tên phân loại và tên file sau lưu 
        const categoryName = body.categoryName;
        const imageName = file ? file.filename : null;

        const isSuccess = await phanLoaiController.addPhanLoai(categoryName, imageName);
        const countPhanLoai = await phanLoaiController.countPhanLoai();

        if (isSuccess) {
            res.status(200).json({ success: true, message: "Thêm phân loại thành công!", countPhanLoai });
        } else {
            res.status(200).json({ success: false, message: "Thêm phân loại thất bại!" });
        }
    } catch (error) {
        console.error("POST Route: '/api/phanloais' - (PhanLoaiRouter): " + error.message);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
})

phanLoaiRouter.put("/:id", upload.single("image"), validate, async (req, res) => {
    try {
        // Lấy đối tượng body fetch và file
        const body = req.body;
        const file = req.file || null;

        // Lấy tên phân loại và tên file sau lưu 
        let isSuccess;
        if (file) {
            const id = req.params.id;
            const categoryName = body.categoryName;
            const imageName = file.filename;

            isSuccess = await phanLoaiController.updatePhanLoai(categoryName, imageName, id);
        } else {
            const id = req.params.id;
            const categoryName = body.categoryName;

            isSuccess = await phanLoaiController.updateNamePhanLoai(categoryName, id);
        }

        if (isSuccess) {
            res.status(200).json({ success: true, message: "Sửa thông tin phân loại thành công!" });
        } else {
            res.status(200).json({ success: false, message: "Sửa thông tin phân loại thất bại!" });
        }
    } catch (error) {
        console.error("PUT Route: '/api/phanloais/:id' - (PhanLoaiRouter): " + error.message);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
})

phanLoaiRouter.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const isSuccess = await phanLoaiController.deletePhanLoai(id);
        const countPhanLoai = await phanLoaiController.countPhanLoai();

        if (isSuccess) {
            res.status(200).json({ success: true, message: "Xóa phân loại thành công!", countPhanLoai });
        } else {
            res.status(200).json({ success: false, message: "Xóa phân loại thất bại!" });
        }
    } catch (error) {
        console.error("DELETE Route: '/api/phanloais/:id' - (PhanLoaiRouter): " + error.message);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
})

module.exports = phanLoaiRouter;