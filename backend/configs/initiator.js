const express = require("express");
const path = require("path");
const { Server } = require('socket.io');
const sessionConfiguration = require("./session.js");

const initStaticFilesServing = function (app) {
    app.use("/", express.static(path.join(__dirname, "../../frontend/images")));
    app.use("/nhanvien", express.static(path.join(__dirname, "../../frontend/nhanvien"), { index: false }));
    app.use("/khachhang", express.static(path.join(__dirname, "../../frontend/khachhang"), { index: false }));
    app.use("/bep", express.static(path.join(__dirname, "../../frontend/bep"), { index: false }));
    app.use("/admin", express.static(path.join(__dirname, "../../frontend/admin"), { index: false }));
    app.use("/login", express.static(path.join(__dirname, "../../frontend/login"), { index: false }));
}

const initRouters = function (app) {
    app.use("/khachhang", require("../routes/ssr/KhachHangRouter.js"));
    
    app.use("/nhanvien", sessionConfiguration.startSession, sessionConfiguration.checkSession, require("../routes/ssr/NhanVienRouter.js"));

    app.use("/bep", sessionConfiguration.startSession, sessionConfiguration.checkSession, require("../routes/ssr/BepRouter.js"));

    app.use("/admin", sessionConfiguration.startSession, sessionConfiguration.checkSession, require("../routes/ssr/AdminRouter.js"));

    app.use("/login", (req, res) => {
        res.render("./login/index.ejs");
    });
}

const initApiRouters = (app) => {
    // API version 1
    app.use("/api/bans", require("../routes/api/v1/BanRouter.js"));
    app.use("/api/monans", require('../routes/api/v1/MonAnRouter.js'));
    app.use("/api/khachhangs", require('../routes/api/v1/KhachHangRouter.js'));
    app.use("/api/taikhoans", require('../routes/api/v1/TaiKhoanRouter.js'));
    app.use("/api/phanloais", require('../routes/api/v1/PhanLoaiRouter.js'));
    app.use("/api/khuyenmais", require('../routes/api/v1/KhuyenMaiRouter.js'));
    app.use("/api/hoadons", require('../routes/api/v1/HoaDonRouter.js'));
    app.use("/api/current-order", require('../routes/api/v1/CurrentOrderRouter.js'));
    app.use("/api/notification", require('../routes/api/v1/ThongBaoRouter.js'));
    app.use("/api/login", sessionConfiguration.startSession, require('../routes/api/v1/LoginRouter.js'));

    // API version 2
    app.use("/api/v2/current-order", require('../routes/api/v2/CurrentOrderRouter.js'));
}

const initSocketIO = (server) => {
    const io = new Server(server);

    io.on("connection", (socket) => {
        const { tableId, role } = socket.handshake.auth;
        
        let customerRoom = "customer-" + tableId;

        if (role === "staff") {
            socket.join("staff");
        } else if (role === "kitchen") {
            socket.join("kitchen");
        } else if (role === "customer") {
            socket.join(customerRoom);
        }

        socket.on("change room", (tableId) => {
            customerRoom = "customer-" + tableId;
        })

        socket.on("notification", (notificationId) => {
            io.to("staff").emit("notification", notificationId);
        })

        socket.on("place order", (tableId) => {
            io.to("staff").emit("place order", tableId);
            io.to("kitchen").emit("place order", tableId);
        })

        socket.on("update order", (tableId) => {
            if (role === "kitchen") {
                io.to("staff").emit("update order", tableId);
            } else if (role === "staff") {
                io.to("kitchen").emit("update order", tableId);
            }
            io.to(customerRoom).emit("update order");
        })

        socket.on("change table", (oldTableId, newTableId) => {
            io.to(customerRoom).emit("change table");
            io.to("kitchen").emit("change table", oldTableId, newTableId);
        })
    })
}

module.exports = {
    initStaticFilesServing,
    initRouters,
    initApiRouters,
    initSocketIO
};