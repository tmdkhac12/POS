const nhanvienRouter = require('express').Router();
const nhanvienController = require("../../controller/ssr/nhanvienController");

nhanvienRouter.get("/", (req, res) => {
    nhanvienController.getHomePage(req, res);
})

nhanvienRouter.get("/chitiet/:id", (req, res) => {
    nhanvienController.getChiTietPage(req, res);
})

module.exports = nhanvienRouter;