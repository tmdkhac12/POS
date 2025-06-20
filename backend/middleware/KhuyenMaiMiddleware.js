const validateKhuyenMai = (req, res, next) => {
    const { name, percent, money, start, end } = req.body;

    // Validate name
    if (typeof name !== 'string' || name.trim().length === 0 || name.length > 255) {
        return res.status(400).json({
            success: false,
            message: "Tên khuyến mãi phải là chuỗi 1–255 ký tự."
        });
    }

    // Validate percent (phần trăm giảm giá: có thể là rỗng nếu dùng theo kiểu tiền)
    if (percent) {
        const percentValue = parseFloat(percent);
        if (isNaN(percentValue) || percentValue < 0 || percentValue > 100) {
            return res.status(400).json({
                success: false,
                message: "Phần trăm giảm giá phải là số từ 0 đến 100."
            });
        }
    }

    // Validate money (số tiền giảm: có thể là rỗng nếu dùng theo phần trăm)
    if (money) {
        const moneyValue = parseFloat(money);
        if (isNaN(moneyValue) || moneyValue < 0) {
            return res.status(400).json({
                success: false,
                message: "Tiền giảm phải là số không âm."
            });
        }
    }

    // Không được truyền cả percent và money cùng rỗng
    if (!percent && !money) {
        return res.status(400).json({
            success: false,
            message: "Phải có khuyến mãi theo phần trăm giảm hoặc tiền giảm."
        });
    }

    // Validate start và end là ngày hợp lệ
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return res.status(400).json({
            success: false,
            message: "Ngày bắt đầu và kết thúc phải là ngày hợp lệ."
        });
    }

    // Ngày kết thúc phải >= ngày bắt đầu
    if (startDate > endDate) {
        return res.status(400).json({
            success: false,
            message: "Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu."
        });
    }

    next();
};

module.exports = { validateKhuyenMai };
