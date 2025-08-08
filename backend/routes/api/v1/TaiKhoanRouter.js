const taiKhoanRouter = require("express").Router();
const taiKhoanController = require('../../../controller/api/v1/TaiKhoanController.js');

const validate  = require('../../../middleware/TaiKhoanMiddlerware.js').validate;
const updateValidate  = require('../../../middleware/TaiKhoanMiddlerware.js').updateValidate;

taiKhoanRouter.get("/", async (req, res) => {
    // localhost:3000/api/taikhoans?page=2&search=
    try {
        const limit = 8;
        const offset = (req.query.page - 1) * limit;
        const search = req.query.search;

        const taiKhoans = await taiKhoanController.getPaginatedTaiKhoans(search, limit, offset);
        const total = await taiKhoanController.countTaiKhoan();

        res.status(200).json({ success: true, taiKhoans, total });
    } catch (error) {
        console.error("GET Route: '/api/taikhoans?query&search=' - (TaiKhoanRouter): " + error.message);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
})

taiKhoanRouter.post("/", validate, async (req, res) => {
    try {
        const { username, password, roleId } = req.body;

        const isSuccess = await taiKhoanController.addTaiKhoan(username, password, roleId);
        const numberOfAccounts = await taiKhoanController.countTaiKhoan();

        if (isSuccess === -1) {
            res.status(400).json({ success: false, message: "Username đã tồn tại, vui lòng nhập username khác!" });
        } else if (isSuccess) {
            res.status(200).json({ success: true, message: "Thêm tài khoản thành công!", numberOfAccounts });
        } else {
            res.status(400).json({ success: false, message: "Thêm tài khoản thất bại!" });
        }

    } catch (error) {
        console.error("POST Route: '/api/taikhoans' - (TaiKhoanRouter): " + error.message);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
})

taiKhoanRouter.put("/:id", updateValidate, async (req, res) => {
    try {
        const id = req.params.id;
        const { username, newPassword, adminUsername, adminPassword, roleId } = req.body;

        const isSuccess = await taiKhoanController.updateTaiKhoan(username, newPassword, adminUsername, adminPassword, roleId, id);

        if (isSuccess === -1) {
            res.status(400).json({ success: false, message: "Username đã tồn tại, vui lòng nhập username khác!" });
        } else if (isSuccess === -2) {
            res.status(400).json({ success: false, message: "Mật khẩu tài khoản admin không chính xác" });
        } else if (isSuccess) {
            res.status(200).json({ success: true, message: "Cập nhật tài khoản thành công!" });
        } else {
            res.status(400).json({ success: false, message: "Cập nhật tài khoản thất bại!" });
        }

    } catch (error) {
        console.error("PUT Route: '/api/taikhoans/:id' - (TaiKhoanRouter): " + error.message);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
})

taiKhoanRouter.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const isSuccess = await taiKhoanController.deleteTaiKhoan(id);
        const numberOfAccounts = await taiKhoanController.countTaiKhoan();

        if (isSuccess) {
            res.status(200).json({ success: true, message: "Xóa tài khoản thành công!", numberOfAccounts });
        } else {
            res.status(400).json({ success: false, message: "Xóa tài khoản thất bại!" });
        }

    } catch (error) {
        console.error("DELETE Route: '/api/taikhoans/:id' - (TaiKhoanRouter): " + error.message);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
})

module.exports = taiKhoanRouter;