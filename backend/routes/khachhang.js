const express = require("express");
const khachhangController = require("../controller/khachhangController");

const khachhangRouter = express.Router();

khachhangRouter.get("/", (req, res) => {
    khachhangController.getHomePage(req, res);
})

module.exports = khachhangRouter;