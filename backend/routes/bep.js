const express = require("express");
const path = require("path");

const bepRouter = express.Router();

bepRouter.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/bep/index.html"));
})

module.exports = bepRouter;