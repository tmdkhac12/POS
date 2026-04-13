// API Controller
const hoaDonModel = require("../../../models/HoaDonModel.js");
const chiTietHoaDonModel = require('../../../models/ChiTietHoaDonModel.js');
const currentOrderModel = require('../../../models/CurrentOrderModel.js');
const khachHangModel = require('../../../models/KhachHangModel.js');
const banModel = require('../../../models/BanModel.js');

const hoaDonUtil = require('../../../util/HoaDonUtil.js');

const pool = require("../../../configs/connection.js").promise();

const getPaginatedHoaDons = async (key, start, end, limit, offset) => {
  try {
    return await hoaDonModel.searchHoaDon(key, start, end, limit, offset);
  } catch (error) {
    console.error("Get getPaginatedHoaDons (HoaDonController): " + error.message);
    throw error;
  }
}

const viewHoaDon = async (id) => {
  try {
    const hoaDon = await hoaDonModel.getHoaDonJoinKhachHangById(id);
    const chiTiets = await chiTietHoaDonModel.getChiTietsOfHoaDon(id);

    return { hoaDon, chiTiets };
  } catch (error) {
    console.error("View Hoa Don (HoaDonController): " + error.message);
    throw error;
  }
}

const countHoaDon = async (key = "", start = null, end = null) => {
  try {
    return await hoaDonModel.getNumberOfHoaDon(key, start, end);
  } catch (error) {
    console.error("Count Hoa Don (HoaDonController): " + error.message);
    throw error;
  }
}

const payment = async (tableId, usedMoney, phone, paymentMethod) => {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    let total = 0;
    const khachHang = await khachHangModel.getKhachHangByPhone(phone);
    if (!khachHang) {
      throw new Error("Khách hàng không tồn tại");
    }

    // Lấy orders của bàn 
    const orders = await currentOrderModel.getCurrentOrdersByTable(tableId);
    for (const order of orders) {
      total += order.don_gia_ap_dung * order.so_luong;
    }

    // Tỉnh tổng tiền thực tế phải trả 
    usedMoney = hoaDonUtil.getUsedMoney(usedMoney, khachHang.tien_tich_luy);
    if (usedMoney > total) {
      usedMoney = total;
    }
    const finalPrice = total - usedMoney;

    // Tính tiền tích lũy được của hóa đơn 
    const invoiceAccu = hoaDonUtil.getInvoiceAccu(finalPrice, khachHang.cap_bac);

    // 1. Tạo hóa đơn mới 
    const invoiceId = await hoaDonModel.insertHoaDon(finalPrice, invoiceAccu, usedMoney, paymentMethod, khachHang.ma_khach_hang, conn);

    // 2. Ghi chi tiết hóa đơn 
    for (const order of orders) {
      const dishId = order.ma_mon_an;
      const quantity = order.so_luong;
      const money = order.don_gia_ap_dung * order.so_luong;
      const unitPrice = order.don_gia_ap_dung;
      const time = order.thoi_gian_dat;

      await chiTietHoaDonModel.insertChiTiet(dishId, invoiceId, quantity, money, unitPrice, time, conn);
    }

    // 3. Cập nhật tổng chi tiêu, tích lũy và cấp bậc cho khách hàng 
    const newTotalExpenditure = khachHang.tong_chi_tieu + finalPrice;
    const customerAccu = khachHang.tien_tich_luy - usedMoney + invoiceAccu;
    const newRank = hoaDonUtil.getNewRank(newTotalExpenditure);
    await khachHangModel.updateTotalAccuRank(newTotalExpenditure, customerAccu, newRank, khachHang.ma_khach_hang, conn);

    // 4. Xóa toàn bộ currentOrder 
    await currentOrderModel.hardDeleteOrderByTable(tableId, conn);

    // 5. Cập nhật trạng thái bàn 
    await banModel.updateTableStatus("Trống", tableId, conn);

    await conn.commit();
    return true;
  } catch (error) {
    console.error("Payment (HoaDonController): " + error.message);
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}

const getStatisticalData = async (startDate, endDate) => {
  try {
    let revenueData = await hoaDonModel.getRevenueByDateRange(startDate, endDate);
    const topProducts = await chiTietHoaDonModel.getTopSellingProducts(startDate, endDate);

    const isSameDay = startDate.split(' ')[0] === endDate.split(' ')[0];

    if (isSameDay) {
      // Lấp đầy các giờ từ 0 đến 23 nếu không có dữ liệu
      const fullHours = [];
      for (let i = 0; i < 24; i++) {
        const found = revenueData.find(item => item.hour === i);
        fullHours.push({
          hour: i,
          revenue: found ? found.revenue : 0,
          totalInvoices: found ? found.totalInvoices : 0
        });
      }
      revenueData = fullHours;
    }

    // Calculate overview totals
    const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
    const totalInvoices = revenueData.reduce((sum, item) => sum + item.totalInvoices, 0);
    const topProduct = topProducts.length > 0 ? topProducts[0].ten_mon_an : "-";

    return {
      revenueData,
      topProducts,
      overview: {
        totalRevenue,
        totalInvoices,
        topProduct
      }
    };
  } catch (error) {
    console.error("Get Statistical Data (HoaDonController): " + error.message);
    throw error;
  }
};

module.exports = {
  getPaginatedHoaDons, getStatisticalData,
  payment,
  viewHoaDon,
  countHoaDon
}