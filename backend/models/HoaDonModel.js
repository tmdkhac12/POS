const pool = require('../configs/connection.js').promise();

const getAllHoaDons = async () => {
    const sql = "select * from hoadon";

    try {
        const [result] = await pool.query(sql);

        return result;        
    } catch (error) {
        throw new Error("Get All Hoa Don (HoaDonModel): " + error.message);
    }
}

const getHoaDons = async (limit, offset) => {
    const sql = "select * from hoadon limit ? offset ?";    

    try {
        const [result] = await pool.execute(sql, [limit, offset]);

        return result;        
    } catch (error) {
        throw new Error("Get Hoa Don Limit Offset (HoaDonModel): " + error.message);
    }
}

const getHoaDonsJoinKhachHang = async (limit, offset) => {
    const sql = `select hd.*, kh.ten_khach_hang, kh.so_dien_thoai 
                from hoadon hd inner join khachhang kh on hd.ma_khach_hang = kh.ma_khach_hang
                limit ? offset ?`;

    try {
        const [result] = await pool.execute(sql, [limit, offset]);

        return result;        
    } catch (error) {
        throw new Error("Get Hoa Don Limit Offset (HoaDonModel): " + error.message);
    }
}

const getNumberOfHoaDon = async () => {
    const sql = "select count(*) as soluong from hoadon";

    try {
        const [result] = await pool.query(sql);

        return result[0].soluong;        
    } catch (error) {
        throw new Error("Get Number of Hoa Don (HoaDonModel): " + error.message);
    }
}

module.exports = {
    getAllHoaDons,
    getNumberOfHoaDon,
    getHoaDons,
    getHoaDonsJoinKhachHang
}