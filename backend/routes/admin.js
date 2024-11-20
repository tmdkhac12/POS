const express = require("express");
const path = require("path");

const adminRouter = express.Router();

adminRouter.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/admin/index.html"));
})

module.exports = adminRouter;