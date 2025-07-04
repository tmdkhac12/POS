const express = require("express");
const path = require("path");

const initStaticFilesServing = function (app) {
    app.use("/", express.static(path.join(__dirname, "../../frontend/images")));
    app.use("/nhanvien", express.static(path.join(__dirname, "../../frontend/nhanvien"), { index: false }));
    app.use("/khachhang", express.static(path.join(__dirname, "../../frontend/khachhang"), { index: false }));
    app.use("/bep", express.static(path.join(__dirname, "../../frontend/bep"), { index: false }));
    app.use("/admin", express.static(path.join(__dirname, "../../frontend/admin"), { index: false }));
}

const initRouters = function (app) {
    app.use("/nhanvien", require("../routes/ssr/NhanVienRouter.js"));

    app.use("/khachhang", require("../routes/ssr/KhachHangRouter.js"));

    app.use("/bep", require("../routes/ssr/BepRouter.js"));

    app.use("/admin", require("../routes/ssr/AdminRouter.js"));
}

const initApiRouters = (app) => {
    app.use("/api/bans", require("../routes/api/BanRouter.js"));
    app.use("/api/monans", require('../routes/api/MonAnRouter.js'));
    app.use("/api/khachhangs", require('../routes/api/KhachHangRouter.js'));
    app.use("/api/taikhoans", require('../routes/api/TaiKhoanRouter.js'));
    app.use("/api/phanloais", require('../routes/api/PhanLoaiRouter.js'));
    app.use("/api/khuyenmais", require('../routes/api/KhuyenMaiRouter.js'));
    app.use("/api/hoadons", require('../routes/api/HoaDonRouter.js'));
    app.use("/api/current-order", require('../routes/api/CurrentOrderRouter.js'));
}

module.exports = {
    initStaticFilesServing,
    initRouters,
    initApiRouters
};