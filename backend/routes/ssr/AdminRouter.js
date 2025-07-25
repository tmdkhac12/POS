const adminRouter = require('express').Router();
const adminController = require("../../controller/ssr/adminController");

adminRouter.get("/", (req, res) => {
    adminController.getHomePage(req, res);
})

module.exports = adminRouter;