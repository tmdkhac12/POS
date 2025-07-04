const validate = (req, res, next) => {
    const name = req.body.name ? req.body.name : req.body.newName;

    // Kiểm tra name 
    if (!name || name.trim().length === 0 || name.length > 255) {
        return res.status(400).json({
            success: false,
            message: "Tên bàn phải là chuỗi từ 1 đến 255 ký tự."
        });
    }

    // Nếu hợp lệ hết thì tiếp tục
    next();
};

const validateUpdateStatus = (req, res, next) => {
    const status = req.body.status;

    // Kiểm tra status
    if (status !== "Có khách" && status !== "Trống") {
        return res.status(400).json({
            success: false,
            message: "Trạng thái không hợp lệ"
        });
    }

    // Nếu hợp lệ hết thì tiếp tục
    next();
};

module.exports = {
    validate,
    validateUpdateStatus
}