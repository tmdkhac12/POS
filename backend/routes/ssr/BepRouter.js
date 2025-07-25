const bepRouter = require('express').Router();
const bepController = require("../../controller/ssr/bepController");

bepRouter.get("/", (req, res) => {
    bepController.getHomePage(req, res);
})

module.exports = bepRouter;