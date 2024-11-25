const express = require("express");
const nhanvienController = require("../controller/nhanvienController");

const nhanvienRouter = express.Router();

nhanvienRouter.get("/", (req, res) => {
    nhanvienController.getHomePage(req, res);
})

nhanvienRouter.get("/chitiet/:id", (req, res) => {
    nhanvienController.getChiTietPage(req, res);
})

module.exports = nhanvienRouter;