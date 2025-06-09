const express = require("express");
const adminController = require("../../controller/ssr/adminController");

const adminRouter = express.Router();

adminRouter.get("/", (req, res) => {
    adminController.getHomePage(req, res);
})

module.exports = adminRouter;