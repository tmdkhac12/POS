const express = require("express");
const bepController = require("../../controller/ssr/bepController");

const bepRouter = express.Router();

bepRouter.get("/", (req, res) => {
    bepController.getHomePage(req, res);
})

module.exports = bepRouter;