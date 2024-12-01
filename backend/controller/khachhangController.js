const path = require("path")
const connection = require("../configs/connection"); //Import kết nối từ connection.js
const { query } = require("express");

const getHomePage = function (req, res) {
    res.sendFile(path.join(__dirname, "../../frontend/khachhang/index.html"));
}

//Lấy ds món ăn
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

//Lấy sản phẩm theo danh mục
const getFilteredProduct = (req,res) => {
    const {category} = req.query;
    const {category_all} = req.query;
    console.log(category);
    const query = (category != category_all) ? "SELECT * FROM monan WHERE DanhMuc = ?" : "SELECT * FROM monan";
    connection.query(query,[category],(err,results) => {
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
};