const express = require("express");
const path = require("path");

const initStaticFilesServing = function (app) {
    app.use("/nhanvien", express.static(path.join(__dirname, "../../frontend/nhanvien")));
    app.use("/khachhang", express.static(path.join(__dirname, "../../frontend/khachhang")));
    app.use("/bep", express.static(path.join(__dirname, "../../frontend/bep")));
    app.use("/admin", express.static(path.join(__dirname, "../../frontend/admin")));
}

const initRouters = function (app) {
    const nhanvienRouter = require("../routes/nhanvien");
    app.use("/nhanvien", nhanvienRouter);

    const khachhangRouter = require("../routes/khachhang");
    app.use("/khachhang", khachhangRouter);

    const bepRouter = require("../routes/bep");
    app.use("/bep", bepRouter);

    const adminRouter = require("../routes/admin");
    app.use("/admin", adminRouter);
}

module.exports = {
    initStaticFilesServing,
    initRouters
};