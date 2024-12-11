const path = require("path")
const connection = require("../configs/connection").promise();

const getHomePage = function (req, res) {
    const getAllBans_SQLquery = "SELECT * FROM ban;"

    connection.query(getAllBans_SQLquery)
        .then(([result]) => {
            // Data bundle 
            const homePageData = {
                tables: result,
                tableQuantity: result.length
            };

            // Render view với dữ liệu trả về
            res.render("nhanvien/index", { homePageData });
        })
        .catch((err) => {
            console.log("Error in controller:", err);
        });
}

const getChiTietPage = function (req, res) {
    const tableId = req.params.id;

    const getTablesQuantity_SQLquery = "SELECT COUNT(*) as 'soluong' FROM ban;";
    const getAllDishes_SQLquery = "SELECT * FROM monan;";

    // Thực hiện các truy vấn song song với Promise.all()
    Promise.all([
        connection.query(getTablesQuantity_SQLquery),
        connection.query(getAllDishes_SQLquery)
    ])
        .then(([getTablesQuantity_result, getAllDishes_result]) => {
            // Các truy vấn đã hoàn thành, xử lý kết quả
            const TABLE_QUANTITY = getTablesQuantity_result[0][0].soluong;
            const dishes = getAllDishes_result[0];

            // Data bundle
            const chiTietPageData = {
                dishes: dishes,
                tableId: tableId
            }

            if (tableId > 0 && tableId <= TABLE_QUANTITY) {
                res.render("nhanvien/chitiet", { chiTietPageData });
            } else {
                res.send("Invalid URL, 404 not Found")
            }
        })
        .catch((err) => {
            console.log("Error getChiTietPage occurred:", err);
        });

}

module.exports = {
    getHomePage,
    getChiTietPage
};