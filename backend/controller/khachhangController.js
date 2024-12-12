const path = require("path")
const connection = require("../configs/connection"); //Import kết nối từ connection.js

const getHomePage = function (req, res) {
    res.sendFile(path.join(__dirname, "../../frontend/khachhang/index.html"));
}

//Load tất cả món ăn
const getMonAn = (req,res) => {
    connection.query("SELECT * FROM monan",(err,results) => {
        if(err){
            console.error("Lỗi khi truy vấn CSDL:", err);
            return res.status(500).send("Lỗi máy chủ");
        }
        res.json(results);
    });
};
//Lấy sản phẩm theo ID
const getProductByID = (req,res) => {
    const productId = req.params.id;    
    connection.query("SELECT * FROM monan WHERE MaMonAn = ?",[productId],(err,results) => {
        if(err){
            console.error("Lỗi khi truy vấn cơ sở dữ liệu");
            return res.status(500).send("Lỗi máy chủ");
        }
        if(results.length == 0){            
            return res.status(404).send("Không tìm thấy món ăn");
        }
        res.json(results[0]);
    })
}

//Lấy sản phẩm đã lọc
const getFilteredProduct = (req,res) => {
    const {category,priceSort,input} = req.query;      
    
    const page = parseInt(req.query.page) || 1;
    const itemPerPage = 10;
    const offset = (page - 1) * itemPerPage;

    let query;
    let params = [];

    if(category != 'Tất cả'){
        query = `SELECT * FROM monan WHERE DanhMuc = ? and TenMonAn LIKE ? ORDER BY ${priceSort} LIMIT ?, ?`
        params = [category,input,offset,itemPerPage];
    }
    else{
        query = `SELECT * FROM monan WHERE TenMonAn LIKE ? ORDER BY ${priceSort} LIMIT ?, ?`
        params = [input,offset,itemPerPage];
    }

    connection.query(query,params,(err,results) => {
        if(err){
            console.error("Lỗi khi truy vấn cơ sở dữ liệu");
            return res.status(500).send("Lỗi máy chủ");
        }                

        //Lấy tổng sản phẩm để tính tổng số trang
        const countQuery = (category != 'Tất cả') 
        ? `SELECT COUNT(*) AS total FROM monan WHERE DanhMuc = ? and TenMonAn LIKE ?`
        : `SELECT COUNT(*) AS total FROM monan WHERE TenMonAn LIKE ?`

        connection.query(countQuery, category != 'Tất cả' ? [category,input] : [input],(countErr, countResults) =>{
            if(countErr){
                console.error("Lỗi khi đếm số lượng sản phẩm");
                return res.status(500).send("Lỗi máy chủ");
            }

            const totalItems = countResults[0].total;
            const totalPages = Math.ceil(totalItems / itemPerPage);

            res.json({
                product: results,
                totalPages,
                currentPage: page,
            })
        })        
    })
}

//Lấy giá trị cuối bảng
const getLastValue = (table, column, callback) => {
    connection.query(`SELECT ${column} FROM ${table} ORDER BY ${column} DESC LIMIT 1`, (err, results) => {
        if (err) {            
            return callback("Lỗi máy chủ", null);
        }
        // Trả kết quả thông qua callback
        callback(null, results.length > 0 ? results[0][column] : 0);
    });
}

//Lưu đánh giá
const addReview = (req, res) => {
    const { DiemDanhGia, BinhLuan } = req.body;

    // Lấy id cuối của các bảng, dùng callback để xử lý
    getLastValue('hoadon', 'id_KhachHang', (error, lastIdKhachHang) => {
        if (error) {
            return res.status(500).json({ message: "Lỗi khi lấy id Khách Hàng" });
        }

        getLastValue('hoadon', 'id_HoaDon', (error, lastIdHoaDon) => {
            if (error) {
                return res.status(500).json({ message: "Lỗi khi lấy id Hóa Đơn" });
            }

            getLastValue('danhgia', 'id_Danhgia', (error, lastIdDanhGia) => {
                if (error) {
                    return res.status(500).json({ message: "Lỗi khi lấy id Đánh Giá" });
                }

                // Tăng id
                const id_Khachhang = lastIdKhachHang;
                const id_HoaDon = lastIdHoaDon;
                const id_Danhgia = lastIdDanhGia + 1;                

                // Lấy ngày hiện tại
                const Ngay = new Date().toISOString().slice(0, 10);                

                // Thêm dữ liệu
                const query = `INSERT INTO danhgia (id_Khachhang,id_Danhgia,id_HoaDon,DiemDanhGia,BinhLuan,Ngay) 
                               VALUES (?, ?, ?, ?, ?, ?)`;

                connection.query(query, [id_Khachhang,id_Danhgia,id_HoaDon,DiemDanhGia,BinhLuan,Ngay], (error, result) => {
                    if (error) {
                        return res.status(500).json({ message: "Lỗi khi thêm đánh giá" });
                    }
                    res.status(201).json({ message: "Thêm đánh giá thành công" });
                });                
            });
        });
    });    

};

module.exports = {
    getHomePage,
    getMonAn,
    getProductByID,  
    getFilteredProduct,       
    addReview, 
};