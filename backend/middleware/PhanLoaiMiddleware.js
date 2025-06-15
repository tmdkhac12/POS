const fs = require('fs');
const path = require('path');

const validate = (req, res, next) => {
    const file = req.file;
    const category = req.body.categoryName;

    // Kiểm tra category 
    if (!category || category.trim().length === 0 || category.length > 255) {
        if (file) {
            try {
                fs.unlinkSync(file.path); // Xóa file nếu không hợp lệ
            } catch (err) {
                console.error("Lỗi khi xóa file do category không hợp lệ:", err.message);
            }
        }

        return res.status(400).json({
            success: false,
            message: "Tên category phải là chuỗi từ 1 đến 255 ký tự."
        });
    }

    // Nếu không có file thì bỏ qua kiểm tra định dạng (có thể tùy chọn bắt buộc/không)
    if (!file) {
        return next();
    }

    // Kiểm tra extension hợp lệ
    const allowedExtensions = [
        '.jpg', '.jpeg', '.png', '.gif',
        '.webp', '.bmp', '.svg', '.avif',
        '.tiff', '.tif', '.heic', '.ico'
    ];
    const extension = path.extname(file.originalname).toLowerCase();

    if (!allowedExtensions.includes(extension)) {
        try {
            fs.unlinkSync(file.path); // Xóa file nếu sai định dạng
        } catch (err) {
            console.error("Lỗi khi xóa file do extension không hợp lệ:", err.message);
        }

        return res.status(400).json({
            success: false,
            message: "Chỉ được upload file hình ảnh (.jpg, .png, .webp, v.v...)."
        });
    }

    // Nếu hợp lệ hết thì tiếp tục
    next();
};

module.exports = {
    validate
}