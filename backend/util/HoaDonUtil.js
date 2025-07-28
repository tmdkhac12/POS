const khachHangModel = require('../models/KhachHangModel.js');

const getUsedMoney = (usedMoney, accu) => {
    if (usedMoney < 0) {
        usedMoney = 0;
    }
    
    if (usedMoney > accu) {
        usedMoney = accu;
    }

    return usedMoney;
}

const getInvoiceAccu = (total, rank) => {
    const percent = _getPercent(rank);
    
    const newAccu = total * percent;
    return Math.floor(newAccu);
}

const getNewRank = (totalExpenditure) => {
    if (totalExpenditure < 2000000) {
        return "Đồng";
    } else if (totalExpenditure >= 2000000 && totalExpenditure < 5000000) {
        return "Bạc";
    } else if (totalExpenditure >= 5000000 && totalExpenditure < 10000000) {
        return "Vàng";
    } else if (totalExpenditure >= 10000000) {
        return "Kim Cương";
    } else {
        return undefined;
    }
}

const _getPercent = (rank) => {
    if (rank === "Đồng") {
        return 0.02;
    } else if (rank === "Bạc") {
        return 0.03;
    } else if (rank === "Vàng") {
        return 0.05;
    } else if (rank === "Kim Cương") {
        return 0.07;
    } else {
        return 0;
    }
}

module.exports = {
    getUsedMoney, getInvoiceAccu, getNewRank
}