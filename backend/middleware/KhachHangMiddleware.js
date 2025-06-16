const validateKhachHang = (req, res, next) => {
    const { name, phone, total, accu } = req.body;

    // Kiểm tra tên khách hàng (nếu có)
    if (name !== undefined) {
        if (typeof name !== 'string' || name.trim().length === 0 || name.length > 255) {
            return res.status(400).json({
                success: false,
                message: "Tên khách hàng phải là chuỗi 1-255 ký tự."
            });
        }
    }

    // Kiểm tra số điện thoại (nếu có)
    if (phone !== undefined) {
        const sdtRegex = /^[0-9]{8,20}$/; // từ 8 đến 20 chữ số
        if (typeof phone !== 'string' || !sdtRegex.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "Số điện thoại phải là chuỗi số có độ dài 8-20 ký tự."
            });
        }
    }

    // Kiểm tra tổng chi tiêu
    if (total !== undefined) {
        const value = parseFloat(total);
        if (isNaN(value) || value < 0) {
            return res.status(400).json({
                success: false,
                message: "Tổng chi tiêu phải là một số không âm."
            });
        }
    }

    // Kiểm tra tiền tích luỹ
    if (accu !== undefined) {
        const value = parseFloat(accu);
        if (isNaN(value) || value < 0) {
            return res.status(400).json({
                success: false,
                message: "Tiền tích luỹ phải là một số không âm."
            });
        }
    }

    next(); // Nếu mọi thứ hợp lệ thì tiếp tục
};

module.exports = {
    validateKhachHang
};
