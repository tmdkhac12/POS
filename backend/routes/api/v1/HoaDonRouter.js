const hoaDonRouter = require("express").Router();
const hoaDonController = require('../../../controller/api/v1/HoaDonController.js');

hoaDonRouter.get("/", async (req, res) => {
  // localhost:3000/api/hoadons?page=2
  try {
    const limit = 8;
    const offset = (req.query.page - 1) * limit;
    const key = req.query.search;
    const start = req.query.start ? req.query.start + " 00:00:00" : null;
    const end = req.query.end ? req.query.end + " 23:59:59" : null;

    // console.log({key, start, end});

    const hoaDons = await hoaDonController.getPaginatedHoaDons(key, start, end, limit, offset);
    const total = await hoaDonController.countHoaDon(key, start, end);

    res.status(200).json({ success: true, hoaDons, total });
  } catch (error) {
    console.error("GET Route: '/api/hoadons?query' - (HoaDonRouter): " + error.message);
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
})

hoaDonRouter.get("/invoice-details/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const data = await hoaDonController.viewHoaDon(id);

    res.status(200).json({ success: true, hoaDon: data.hoaDon, chiTiets: data.chiTiets });

  } catch (error) {
    console.error("GET Route: '/api/hoadons/invoice-details/:id' - (HoaDonRouter): " + error.message);
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
})

hoaDonRouter.get("/statistics", async (req, res) => {
  // URL: /api/hoadons/statistics?startDate=2024-04-01&endDate=2024-04-12
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ success: false, message: "Missing date range" });
    }

    // Add time to dates to cover full day
    const formattedStart = `${startDate} 00:00:00`;
    const formattedEnd = `${endDate} 23:59:59`;

    const data = await hoaDonController.getStatisticalData(formattedStart, formattedEnd);
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("GET Route: '/api/hoadons/statistics' - (HoaDonRouter): " + error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

hoaDonRouter.post("/payment", async (req, res) => {
  try {
    const tableId = parseInt(req.body.tableId);
    const usedMoney = parseFloat(req.body.usedMoney) || 0;
    const phone = req.body.phone;
    const paymentMethod = req.body.paymentMethod;

    const isSuccess = await hoaDonController.payment(tableId, usedMoney, phone, paymentMethod);

    res.status(200).json({ success: isSuccess, message: "Thanh toán thành công" });
  } catch (error) {
    console.error("POST Route: '/api/hoadons/payment' - (HoaDonRouter): " + error.message);
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
})

module.exports = hoaDonRouter;