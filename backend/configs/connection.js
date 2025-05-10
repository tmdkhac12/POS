const mysql = require("mysql2")
const dotenv = require("dotenv")
const path = require("path")

dotenv.config({ path: path.join(__dirname, "../.env") });

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
})

// Kiểm tra kết nối (chỉ thực hiện 1 lần khi khởi động)
pool.promise().getConnection()
    .then((connection) => {
        console.log("Connected!")
        connection.release()
    })
    .catch((error) => {
        console.log("Can not find connection!")
    })

module.exports = pool 