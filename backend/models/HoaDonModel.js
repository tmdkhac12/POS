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

const getHoaDonOfKhachHang = async (id) => {
    const sql = "select * from hoadon where ma_khach_hang = ?";    

    try {
        const [result] = await pool.execute(sql, [id]);

        return result;        
    } catch (error) {
        throw new Error("Get Hoa Don Of Khach Hang (HoaDonModel): " + error.message);
    }
}

const getHoaDonById = async (id) => {
    const sql = "select * from hoadon where ma_hoa_don = ?";    

    try {
        const [result] = await pool.execute(sql, [id]);

        return result[0];        
    } catch (error) {
        throw new Error("Get Hoa Don By Id (HoaDonModel): " + error.message);
    }
}

const getHoaDonJoinKhachHangById = async (id) => {
    const sql = `select hd.*, kh.ten_khach_hang, kh.so_dien_thoai
                from hoadon hd inner join khachhang kh on hd.ma_khach_hang = kh.ma_khach_hang
                where ma_hoa_don = ?`;    

    try {
        const [result] = await pool.execute(sql, [id]);

        return result[0];        
    } catch (error) {
        throw new Error("Get Hoa Don By Id (HoaDonModel): " + error.message);
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

const searchHoaDon = async (key, start, end, limit, offset) => {
    const sql = `select hd.*, kh.ten_khach_hang, kh.so_dien_thoai 
                from hoadon hd inner join khachhang kh on hd.ma_khach_hang = kh.ma_khach_hang
                where (kh.ten_khach_hang like ? or kh.so_dien_thoai like ?) 
                    and (? is null or thoi_gian_tao >= ?) and (? is null or thoi_gian_tao <= ?)
                limit ? offset ?`;

    try {
        const [result] = await pool.execute(sql, [`%${key}%`, `%${key}%`, start, start, end, end, limit, offset]);

        return result;        
    } catch (error) {
        throw new Error("Search Hoa Don (HoaDonModel): " + error.message);
    }
}

const getNumberOfHoaDon = async (key, start, end) => {
    const sql = `select count(*) as soluong 
                from hoadon hd inner join khachhang kh on hd.ma_khach_hang = kh.ma_khach_hang
                where (kh.ten_khach_hang like ? or kh.so_dien_thoai like ?) 
                and (? is null or thoi_gian_tao >= ?) and (? is null or thoi_gian_tao <= ?)`;

    try {
        const [result] = await pool.execute(sql, [`%${key}%`, `%${key}%`, start, start, end, end]);

        return result[0].soluong;        
    } catch (error) {
        throw new Error("Get Number of Hoa Don (HoaDonModel): " + error.message);
    }
}

module.exports = { 
    getAllHoaDons, getNumberOfHoaDon, getHoaDonOfKhachHang, getHoaDonById, getHoaDonJoinKhachHangById, getHoaDonsJoinKhachHang,
    searchHoaDon
}