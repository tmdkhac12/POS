const express = require("express");
const khachHangController = require("../../controller/ssr/khachhangController");

const khachHangRouter = express.Router();

khachHangRouter.get("/table/:id", (req, res) => {
    khachHangController.getHomePage(req, res);
})

module.exports = khachHangRouter;