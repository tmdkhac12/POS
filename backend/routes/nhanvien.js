const express = require("express");
const path = require("path");

const nhanvienRouter = express.Router();

nhanvienRouter.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/nhanvien/index.html"));
})

module.exports = nhanvienRouter;