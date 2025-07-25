const khachHangRouter = require('express').Router();
const khachHangController = require("../../controller/ssr/khachhangController");

khachHangRouter.get("/table/:id", (req, res) => {
    khachHangController.getHomePage(req, res);
})

module.exports = khachHangRouter;