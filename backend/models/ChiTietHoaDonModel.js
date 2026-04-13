const pool = require('../configs/connection.js').promise();

const getChiTietsOfHoaDon = async (id) => {
  const sql = `select c.ma_mon_an, c.so_luong, c.thanh_tien, c.gia_mon_an, c.ghi_chu, c.thoi_gian_dat, m.ten_mon_an 
                from chitiethoadon c 
                inner join monan m on c.ma_mon_an = m.ma_mon_an 
                where ma_hoa_don = ?`;

  try {
    const [result] = await pool.execute(sql, [id]);

    return result;
  } catch (error) {
    throw new Error("Get Chi Tiet Of Hoa Don (ChiTietHoaDonModel): " + error.message);
  }
}

const insertChiTiet = async (dishId, invoiceId, quantity, money, unitPrice, orderTime, conn = pool) => {
  const sql = `insert into chitiethoadon (ma_mon_an, ma_hoa_don, so_luong, thanh_tien, gia_mon_an, thoi_gian_dat)
                values (?,?,?,?,?,?)`;

  try {
    const [result] = await conn.execute(sql, [dishId, invoiceId, quantity, money, unitPrice, orderTime]);

    return result.affectedRows > 0;
  } catch (error) {
    throw new Error("Insert Chi Tiet (ChiTietHoaDonModel): " + error.message);
  }
}

const getTopSellingProducts = async (startDate, endDate, limit = 5) => {
  const sql = `
        SELECT ma.ten_mon_an, SUM(cthd.so_luong) as totalQuantity, SUM(cthd.so_luong * cthd.gia_mon_an) as totalRevenue
        FROM ChiTietHoaDon cthd
        JOIN MonAn ma ON cthd.ma_mon_an = ma.ma_mon_an
        WHERE cthd.thoi_gian_dat BETWEEN ? AND ?
        GROUP BY cthd.ma_mon_an
        ORDER BY totalQuantity DESC
        LIMIT ?
    `;
  try {
    const [result] = await pool.execute(sql, [startDate, endDate, limit]);
    return result;
  } catch (error) {
    throw new Error("Get Top Selling Products (ChiTietHoaDonModel): " + error.message);
  }
};

module.exports = {
  getChiTietsOfHoaDon, getTopSellingProducts,
  insertChiTiet
}