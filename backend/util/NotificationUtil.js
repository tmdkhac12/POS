const getNotificationMessage = (category, tableName) => {
    switch (category) {
        case "Gọi món":
            return `Có món mới từ ${tableName}`;
        case "Thanh toán":
            return `${tableName} yêu cầu thanh toán`;
        case "Hỗ trợ":
            return `${tableName} cần nhân viên hỗ trợ`;
        default:
            throw new Error("Invalid category");
    }
};

module.exports = {
    getNotificationMessage
};