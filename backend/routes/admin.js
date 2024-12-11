const express = require("express");

const adminController = require("../controller/adminController");

const adminRouter = express.Router();

adminRouter.get("/", (req, res) => {
  adminController.getHomePage(req, res);
});
adminRouter.get("/sanpham", (req, res) => {
  adminController.getAllProduct(req, res);
});
adminRouter.post("/sanpham", (req, res) => {
  adminController.addProduct(req, res);
});
adminRouter.delete("/sanpham/:MaMonAn", (req, res) => {
  adminController.deleteProduct(req, res);
});
adminRouter.put("/sanpham/:MaMonAn", (req, res) => {
  adminController.updateProduct(req, res);
});
adminRouter.get("/search", (req, res) => {
  adminController.searchProduct(req, res);
});

adminRouter.get("/quan-ly-nhan-vien", (req, res) => {
  adminController.getAllEmployees(req, res);
});
adminRouter.get("/danh-gia-khach-hang", (req, res) => {
  adminController.getAllEvaluations(req, res);
});
adminRouter.get("/doanh-thu", (req, res) => {
  adminController.getRevenueData(req, res);
});

module.exports = adminRouter;
