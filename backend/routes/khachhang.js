const express = require("express");
const khachhangController = require("../controller/khachhangController");
const khachhangRouter = express.Router();

khachhangRouter.get("/", (req, res) => {
    khachhangController.getHomePage(req, res);
})

//Load menu
khachhangRouter.get("/monan",khachhangController.getMonAn);

//Get product by ID
khachhangRouter.get("/monan/:id",khachhangController.getProductByID);
 
khachhangRouter.get('/category',khachhangController.getFilteredProduct);

khachhangRouter.get('/search',khachhangController.searchProduct);

module.exports = khachhangRouter;