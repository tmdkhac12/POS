const mysql = require("mysql2")
const dotenv = require("dotenv")
const path = require("path")

dotenv.config({ path: path.join(__dirname, "../.env") });

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
})

connection.connect((err) => {
    if (err) {
        console.log("Error when connect to DB!");
    } else {
        console.log("Connected!");
    }
})

module.exports = connection