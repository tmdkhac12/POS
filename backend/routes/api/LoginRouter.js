const loginRouter = require('express').Router();
const taiKhoanController = require('../../controller/api/TaiKhoanController');

loginRouter.post("/", async (req, res) => {
    try {
        const { username, password } = req.body;

        const roleId = await taiKhoanController.checkLogin(username, password);
        if (roleId > 0) {
            // Login successful
            req.session.user = {
                username,
                roleId
            }
            
            res.status(200).json({ success: true, roleId });
        } else {
            // Login failed
            res.status(400).json({ success: false, message: "Tên đăng nhập hoặc mật khẩu không chính xác" });
        }
    } catch (error) {
        console.error("POST Route: '/api/login' - (LoginRouter): " + error.message);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
})

loginRouter.delete("/", async (req, res) => {
    try {
        await req.session.destroy();
        res.clearCookie('connect.sid');
        res.status(200).json({ success: true, message: "Đăng xuất thành công" });
    } catch (error) {
        console.error(" DELETE Route: '/api/login' - (LoginRouter): " + error.message);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
});

module.exports = loginRouter;