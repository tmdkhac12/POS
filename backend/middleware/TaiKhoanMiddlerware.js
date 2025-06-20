const validate = (req, res, next) => {
    const { username, password, confirmPassword, roleId } = req.body;

    // Validate username
    if (typeof username !== 'string' || username.trim().length === 0 || username.length > 255) {
        return res.status(400).json({
            success: false,
            message: "Username phải là chuỗi 1–255 ký tự."
        });
    }

    // Validate password
    if (typeof password !== 'string' || password.length < 3 || password.length > 255) {
        return res.status(400).json({
            success: false,
            message: "Mật khẩu phải từ 3–255 ký tự."
        });
    }

    // Validate confirmPassword
    if (password !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Xác nhận mật khẩu không khớp."
        });
    }

    // Validate roleId (phải là số 1, 2 hoặc 3)
    const role = parseInt(roleId);
    if (![1, 2, 3].includes(role)) {
        return res.status(400).json({
            success: false,
            message: "Nhóm quyền không hợp lệ. Chỉ chấp nhận roleId từ 1 đến 3."
        });
    }

    next(); // Dữ liệu hợp lệ, chuyển qua middleware tiếp theo
};

const updateValidate = (req, res, next) => {
    const { username, newPassword, adminPassword, roleId } = req.body;

    // Validate username
    if (typeof username !== 'string' || username.trim().length === 0 || username.length > 255) {
        return res.status(400).json({
            success: false,
            message: "Username phải là chuỗi 1–255 ký tự."
        });
    }

    // Validate newPassword
    if (typeof newPassword !== 'string' || newPassword.length < 3 || newPassword.length > 255) {
        return res.status(400).json({
            success: false,
            message: "Mật khẩu phải từ 3–255 ký tự."
        });
    }

    // Validate adminPassword
    if (adminPassword === "") {
        return res.status(400).json({
            success: false,
            message: "Mật khẩu admin không được để trống"
        });
    }

    // Validate roleId (phải là số 1, 2 hoặc 3)
    const role = parseInt(roleId);
    if (![1, 2, 3].includes(role)) {
        return res.status(400).json({
            success: false,
            message: "Nhóm quyền không hợp lệ. Chỉ chấp nhận roleId từ 1 đến 3."
        });
    }

    next(); // Dữ liệu hợp lệ, chuyển qua middleware tiếp theo
} 

module.exports = { validate, updateValidate };
