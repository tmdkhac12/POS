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

module.exports = {
    getChiTietsOfHoaDon
}