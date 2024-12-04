const path = require("path")
const connection = require("../configs/connection"); //Import kết nối từ connection.js
const { query } = require("express");

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
    const {category,priceSort} = req.query;      
    
    const page = parseInt(req.query.page) || 1;
    const itemPerPage = 10;
    const offset = (page - 1) * itemPerPage;

    let query;
    let params = [];

    if(category != 'Tất cả'){
        query = `SELECT * FROM monan WHERE DanhMuc = ? ORDER BY ${priceSort} LIMIT ?, ?`
        params = [category,offset,itemPerPage];
    }
    else{
        query = `SELECT * FROM monan ORDER BY ${priceSort} LIMIT ?, ?`
        params = [offset,itemPerPage];
    }

    connection.query(query,params,(err,results) => {
        if(err){
            console.error("Lỗi khi truy vấn cơ sở dữ liệu");
            return res.status(500).send("Lỗi máy chủ");
        }
        

        //Lấy tổng sản phẩm để tính tổng số trang
        const countQuery = (category != 'Tất cả') 
        ? `SELECT COUNT(*) AS total FROM monan WHERE DanhMuc = ?`
        : `SELECT COUNT(*) AS total FROM monan`

        connection.query(countQuery, category != 'Tất cả' ? [category] : [],(countErr, countResults) =>{
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

const searchProduct = (req,res) => {
    const {input} = req.query
    const query = "SELECT * FROM monan WHERE TenMonAn LIKE ?"
    connection.query(query,[`%${input}%`],(err,results) => {
        if(err){
            console.error("Lỗi khi truy vấn cơ sở dữ liệu");
            return res.status(500).send("Lỗi máy chủ");
        }
        if(results.length == 0){            
            return res.status(404).send("Không tìm thấy món ăn");
        }
        res.json(results);
    })
}
module.exports = {
    getHomePage,
    getMonAn,
    getProductByID,  
    getFilteredProduct,    
    searchProduct,
};