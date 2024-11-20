const express = require("express");
const path = require("path");

const khachhangRouter = express.Router();

khachhangRouter.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/khachhang/index.html"));
})

module.exports = khachhangRouter;