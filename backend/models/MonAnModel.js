const pool = require("../configs/connection").promise()

const getDishesByGroup = async (group_id) => {
    const sql = "SELECT * FROM monan WHERE ma_nhom = ? and is_deleted = 0"

    try {
        const [result] = await pool.query(sql, [group_id]);
        return result;
    } catch (error) {
        throw new Error("Get Dishes By Group (MonAnModel): " + error.message)
    }
}

const getDishesJoinGroup = async (limit, offset) => {
    const sql = "SELECT * FROM monan INNER JOIN nhom ON monan.ma_nhom = nhom.ma_nhom where monan.is_deleted = 0 LIMIT ? OFFSET ?";

    try {
        const [result] = await pool.execute(sql, [limit, offset]);
        return result;
    } catch (error) {
        throw new Error("Get Dishes Join Group (MonAnModel): " + error.message)
    }
}

const getDishesJoinGroupJoinKM = async (limit, offset) => {
    const sql = `SELECT 
                    m.*, 
                    
                    CASE 
                        WHEN m.ma_khuyen_mai IS NOT NULL AND NOW() BETWEEN km.ngay_bat_dau AND km.ngay_ket_thuc
                        THEN ROUND(m.don_gia 
                                - COALESCE(km.giam_theo_tien, 0)
                                - (m.don_gia * COALESCE(km.giam_theo_phan_tram, 0) / 100), 0)
                        ELSE m.don_gia
                    END AS don_gia_sau_khuyen_mai,
                    
                    n.ten_nhom
                    
                FROM monan m  
                INNER JOIN nhom n ON m.ma_nhom = n.ma_nhom
                LEFT JOIN khuyenmai km ON m.ma_khuyen_mai = km.ma_khuyen_mai
                where m.is_deleted = 0 LIMIT ? OFFSET ?`;

    try {
        const [result] = await pool.execute(sql, [limit, offset]);
        return result;
    } catch (error) {
        throw new Error("Get Dishes Join Group (MonAnModel): " + error.message)
    }
}

const getNumberOfDishes = async () => {
    const sql = "select count(*) as soluong from monan where is_deleted = 0";

    try {
        const [result] = await pool.query(sql);

        return result[0].soluong;
    } catch (error) {
        throw new Error("Get Number Of Dishes (MonAnModel): " + error.message)
    }
}

const insertMonAn = async (name, price, categoryId, discountId, image) => {
    const sql = `insert into monan(ten_mon_an, don_gia, ma_nhom, ma_khuyen_mai, hinh_anh)
                values (?, ?, ?, ?, ?)`;

    try {
        const [result] = await pool.execute(sql, [name, price, categoryId, discountId, image]);

        return result.affectedRows > 0;
    } catch (error) {
        throw new Error("Insert Mon An (MonAnModel): " + error.message)
    }
}

const updateMonAn = async (name, price, categoryId, discountId, image, id) => {
    const sql = `update monan set ten_mon_an = ?, don_gia = ?, ma_nhom = ?, ma_khuyen_mai = ?, hinh_anh = ?
                where ma_mon_an = ?`;

    try {
        const [result] = await pool.execute(sql, [name, price, categoryId, discountId, image, id]);

        return result.affectedRows > 0;
    } catch (error) {
        throw new Error("Insert Mon An (MonAnModel): " + error.message)
    }
}

const updateMonAnWithoutImg = async (name, price, categoryId, discountId, id) => {
    const sql = `update monan set ten_mon_an = ?, don_gia = ?, ma_nhom = ?, ma_khuyen_mai = ?
                where ma_mon_an = ?`;

    try {
        const [result] = await pool.execute(sql, [name, price, categoryId, discountId, id]);

        return result.affectedRows > 0;
    } catch (error) {
        throw new Error("Insert Mon An (MonAnModel): " + error.message)
    }
}

const softDeleteMonAn = async (id) => {
    const sql = "update monan set is_deleted = 1 where ma_mon_an = ?";

    try {
        const [result] = await pool.execute(sql, [id]);

        return result.affectedRows > 0;
    } catch (error) {
        throw new Error("Soft Delete Mon An (MonAnModel): " + error.message)
    }
}

module.exports = { 
    getDishesByGroup, getDishesJoinGroup, getNumberOfDishes, getDishesJoinGroupJoinKM,
    insertMonAn,
    updateMonAn, updateMonAnWithoutImg,
    softDeleteMonAn
}